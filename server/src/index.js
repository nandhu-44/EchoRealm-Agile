const express = require("express");
const chalk = require("chalk");
const cors = require("cors");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const rateLimitMiddleware = require("./middlewares/rateLimiter");
const dotenv = require("dotenv");
const http = require("http");
const socketIO = require("socket.io");
const { randomUUID } = require("crypto");

dotenv.config();
console.clear();

const { connectMongo } = require("./database/mongoose");
connectMongo(process.env.MONGO_URI);

const routes = require("./routes/routes");

const port = 8080;
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(rateLimitMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

app.get("/", (_req, res) => {
  res.send("Server is running!");
});

app.post("/", (req, res) => {
  res.json({ message: "Testing : " + req.body?.content ?? "none" });
});

app.use("/api", routes);

server.listen(port, () => {
  console.log(`Server is running on port ${chalk.blue(port)}!`);
});

process.on("unhandledRejection", (error) => {
  console.error(error);
});

process.on("uncaughtException", (error) => {
  console.error(error);
});


// Chatroom functionality.
let waitlist = [];

function generateRandomID() {
  return randomUUID();
}

function createRoom() {
  const roomID = generateRandomID();
  return roomID;
}

io.on("connection", (socket) => {
  socket.on("join", ({ username }) => {
    // Check if the socket is already in the waitlist
    if (!waitlist.includes({
      username,
      socket
    })) {
      waitlist.push({
        username,
        socket
      });
    }

    // If theres only one user in the waitlist then return
    if (waitlist.length === 1) {
      return;
    }

    // Checks if there are at least two users in the waitlist
    if (waitlist.length >= 2) {
      // Randomly selects two users from the waitlist
      const randomIndex1 = Math.floor(Math.random() * waitlist.length);
      let randomIndex2;
      do {
        randomIndex2 = Math.floor(Math.random() * waitlist.length);
      } while (randomIndex2 === randomIndex1);
      const user1 = waitlist[randomIndex1];
      const user2 = waitlist[randomIndex2];
      if (!user1 || !user2) return;
      if (!user1.socket || !user2.socket) return;
      if (user1.username === user2.username) return;

      // Remove the selected users from the waitlist
      waitlist.splice(randomIndex1, 1);
      if (randomIndex1 < randomIndex2) {
        randomIndex2--;
      }
      waitlist.splice(randomIndex2, 1);

      // Creates a room and join the users to it
      const roomID = createRoom();
      user1.socket.join(roomID);
      user2.socket.join(roomID);

      // Emits a roomReady event to the selected users
      // io.to(roomID).emit("roomReady", { id: roomID });
      io.to(roomID).emit("roomReady", {
        id: roomID,
        user1: user1.username,
        user2: user2.username
      });
    }
  });

  // Handles the message event from the client and sends it to the room
  socket.on("message", (message) => {
    io.to(message.roomID).emit("newMessage", message);
  });

  socket.on('disconnecting', (roomID) => {
    const room = io.sockets.adapter.rooms.get(roomID);
    if (room) {
      const sockets = Array.from(room);
      if (sockets.length === 2) {
        const remainingSocket = sockets.find(s => s !== socket.id);
        const remainingUser = waitlist.find(user => user.socket.id === remainingSocket);
        waitlist.push(remainingUser);
        io.to(remainingSocket).emit('otherUserDisconnected');
        socket.leave(roomID);
      }
    }
  });

  socket.on("disconnect", () => {

    const index = waitlist.indexOf(socket);
    if (index !== -1) {
      waitlist.splice(index, 1);
    }
  });
});

setInterval(() => {
  console.log("Users in waiting list", waitlist.length);
}, 3000);