import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socket from "../../socket/socket";
import "./chat.css";
import { Messages } from "./messages/messages";
import ScrollToBottom from "react-scroll-to-bottom";

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { name, room } = useSelector((state) => state.user);

  useEffect(() => {
    socket.emit("greeting", socket.id);
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const sendMessage = () => {
    if (message) {
      socket.emit("sendMessage", message, setMessage(""));
    }
  };

  return (
    <div className="chatbox">
      <div className="top">{room}</div>
      <ScrollToBottom debug={false} className="main">
        <Messages messages={messages} name={name} />
      </ScrollToBottom>
      <div className="bottom">
        <input
          type="text"
          className="chatInput"
          placeholder="Enter a message..."
          value={message}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage() : null)}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="chatSend" onClick={() => sendMessage()}>
          Send
        </button>
      </div>
    </div>
  );
};
