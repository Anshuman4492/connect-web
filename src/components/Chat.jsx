import React, { useEffect, useState } from "react";
import createSocketConnection from "../utils/socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const userId = user?._id;

  useEffect(() => {
    // Fetch older messages when the component mounts
    const fetchOlderMessages = async () => {
      const olderMessages = await axios.get(
        BASE_URL + "/chat/" + targetUserId,
        { withCredentials: true }
      );
      console.log(olderMessages, "olderMessages");
      const chatMessages = olderMessages?.data?.chat?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
        };
      });
      setMessages(chatMessages);
    };
    fetchOlderMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;

    // Create a socket connection
    const socket = createSocketConnection();
    console.log("Socket connection created:", socket);
    // As soon as page loads, join the chat
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { firstName, lastName, text },
      ]);
      console.log("Message received from", firstName, ":", text);
    });

    return () => {
      // Clean up the socket connection when the component unmounts
      socket.disconnect();
    };
  }, [userId, targetUserId]);
  console.log(messages);
  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="mx-auto border rounded-2xl text-white flex flex-col w-7/12 h-[70vh]">
      <h1 className="p-5">Chat</h1>
      <div className="flex-1 justify-center w-auto overflow-scroll">
        {messages.map((msg, index) => {
          const { firstName, lastName, text } = msg;
          return (
            <div className="chat chat-start" key={index}>
              <div className="chat-header">
                {`${firstName} ${lastName}`}
                <time className="text-xs opacity-50">
                  {`${new Date().getHours()}:${new Date().getMinutes()}`}
                </time>
              </div>
              <div className="chat-bubble">{text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>
      <div className="p-2 border-t border-fuchsia-50 flex justify-center gap-2">
        <input
          className="flex-1 border-white bg-blue-300 rounded-2xl text-black"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="btn btn-secondary rounded-2xl"
          onClick={sendMessage}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
