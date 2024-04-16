import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { AiOutlineSend } from "react-icons/ai";

function ChatPage({ isChatsOpen }) {
  const [isConnected, setIsConnected] = useState(false);
  const [roomID, setRoomID] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const scrollRef = useRef();

  const socket = io(import.meta.env.VITE_BACKEND_URL);

  useEffect(() => {
    const joinRoomInterval = setInterval(() => {
      socket.emit("join");
      console.log("Joining a room...");
    }, 5000);

    socket.on("roomReady", (room) => {
      setRoomID(room.id);
      setIsConnected(true);
      clearInterval(joinRoomInterval);
    });

    return () => {
      clearInterval(joinRoomInterval);
    };
  }, []);

  useEffect(() => {
    if (!isChatsOpen) {
      socket.emit("disconnecting", roomID);
      socket.disconnect();
    }
  }, [isChatsOpen]);

  useEffect(() => {
    socket.on("otherUserDisconnected", (roomID) => {
      if (roomID) {
        alert("other user disconnected...");
      }
    });

    const handleNewMessage = (message) => {
      setMessages((prev) => [...prev, message]);
      scrollToBottom();
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      const message = {
        text: messageInput,
        username: user.username,
        roomID: roomID,
      };
      socket.emit("message", message);
      setMessageInput("");
    }
  };

  const handleInputChange = (event) => {
    setMessageInput(event.target.value);
  };

  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      {isConnected ? (
        <>
          <div className="w-full h-[95%] flex flex-col items-center justify-start">
            <div className="w-full h-full flex flex-col items-center justify-start overflow-y-scroll">
              {messages.map((message, index) => (
                <div
                  className={`w-full flex ${
                    message.username === user.username
                      ? "justify-end"
                      : "justify-start"
                  } px-5`}
                  key={index}
                >
                  <p
                    className={`px-4 py-2 rounded-lg mb-2 ${
                      message.username === user.username
                        ? "bg-purple-500 text-white shadow-md shadow-purple-500/50"
                        : "bg-green-500 text-white shadow-md shadow-green-500/50"
                    }`}
                  >
                    {message.text}
                  </p>
                </div>
              ))}
              <div style={{ width: 1, height: 1 }} ref={scrollRef}></div>
            </div>
          </div>
          <form
            className="w-1/2 min-h-12 flex items-center justify-between bg-white/80 rounded-lg p-2 md:w-full"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <input
              type="text"
              placeholder="Type a message..."
              value={messageInput}
              onChange={handleInputChange}
              className="w-[90%] bg-transparent outline-none px-4 placeholder:text-black/50 md:w-[99%]"
            />
            <AiOutlineSend
              className="w-6 h-6 text-purple-500 rounded-full p-1 hover:text-purple-700 cursor-pointer"
              onClick={sendMessage}
            />
          </form>
        </>
      ) : (
        <h1 className="text-2xl text-white font-bold">Joining a Chat......</h1>
      )}
    </div>
  );
}

export default ChatPage;