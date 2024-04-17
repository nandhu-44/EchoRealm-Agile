import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { AiOutlineSend } from "react-icons/ai";
import Loader from "../components/Loader";

function ChatPage({ isChatsOpen }) {
  const [isConnected, setIsConnected] = useState(false);
  const [roomID, setRoomID] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  // Other username
  const [otherUsername, setOtherUsername] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const scrollRef = useRef(null);

  const socket = io(
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"
  );

  useEffect(() => {
    const joinRoomInterval = setInterval(() => {
      socket.emit("join", {
        username: user.username,
      });
    }, 1000);

    socket.on("roomReady", (room) => {
      setRoomID(room.id);
      setIsConnected(true);
      setOtherUsername(room.user1 === user.username ? room.user2 : room.user1);
      clearInterval(joinRoomInterval);
    });

    socket.on("otherUserDisconnected", () => {
      alert("The other user has left the chat.");
      setRoomID("");
      setIsConnected(false);
      setOtherUsername("");
      setMessages([]);
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

    const handleNewMessage = (newMessage) => {
      const date = new Date();
      const time = `${date.getHours()}:${date.getMinutes()}`;
      const message = { ...newMessage, time };
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

  scrollRef.current?.scrollTo({
    top: scrollRef.current.scrollHeight,
    behavior: "smooth",
  });

  const getUsernameAndTime = (message, index, messages, user) => {
    const username =
      message.username === user.username ? "You" : message.username;

    if (index === 0 || messages[index - 1]?.username !== message.username) {
      return (
        <span className="flex justify-between">
          <span>{username}</span>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <span className="font-medium text-gray-200">{message.time}</span>
        </span>
      );
    }

    return null;
  };

  return (
    <div
      className=" w-full flex flex-col items-center justify-center"
      style={{
        height: "90svh",
        overflowY: "hidden",
        width: `${window.innerWidth > 768 ? "80vw" : "100vw"}`,
      }}
    >
      {isConnected ? (
        <>
          <div
            className="w-full flex flex-col items-center justify-start "
            style={{
              height: "90%",
            }}
          >
            <div
              className="w-full flex flex-col items-center justify-start py-8"
              style={{
                overflowY: "auto",
                height: "100%",
                overflowX: "hidden",
              }}
              ref={scrollRef}
            >
              <p className="text-center text-white bg-blue-500 rounded-md px-2 py-1 text-xs lg:text-sm mb-4 lg:mb-6">
                {" "}
                You are now chatting with {otherUsername}.
              </p>
              {messages.map((message, index) => (
                <div
                  className={`w-full flex ${
                    message.username === user.username
                      ? "justify-end"
                      : "justify-start"
                  } `}
                  key={index}
                >
                  <p
                    className={`px-4 py-2 rounded-lg mb-2 ${
                      message.username === user.username
                        ? "bg-purple-500 text-white shadow-md shadow-purple-500/50"
                        : "bg-green-500 text-white shadow-md shadow-green-500/50"
                    }`}
                    style={{
                      maxWidth: "60%",
                      wordWrap: "break-word",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                      }}
                    >
                      {getUsernameAndTime(message, index, messages, user)}
                    </span>
                    {message.text}
                  </p>
                </div>
              ))}
              <div style={{ width: 1, height: 1 }} ref={scrollRef}></div>
            </div>
          </div>
          <form
            style={{
              width: `${window.innerWidth > 768 ? "50%" : "90%"}`,
              height: "10%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              backgroundColor: "rgba(255, 255, 255, 0.71)",
              borderRadius: "20px",
            }}
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
              // className="rounded-full px-2 text-black"
              style={{
                width: "80%",
                height: "70%",
                borderRadius: "20px",
                border: "none",
                padding: "0 20px",
                outline: "none",
                backgroundColor: "transparent",
                color: "rgba(0, 0, 0, 0.71)",
              }}
            />
            <AiOutlineSend
              style={{
                width: "10%",
                height: "70%",
                cursor: "pointer",
                color: "rgba(0, 0, 0, 0.71)",
              }}
              onClick={sendMessage}
            />
          </form>
        </>
      ) : (
        <>
          <Loader text="" />
          <h1 className="text-2xl text-white font-bold">Joining a Chat...</h1>
        </>
      )}
    </div>
  );
}

export default ChatPage;
