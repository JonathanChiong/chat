import ReactEmoji from "react-emoji";

import "./message.css";

export const Message = ({ message, name }) => {
  const style = (sender) => {
    if (sender === "admin") {
      return "admin";
    } else if (sender === name) {
      return "user";
    } else {
      return "other";
    }
  };

  return (
    <div className="messageContainer">
      <p className={`content ${style(message.user)}`}>
        {ReactEmoji.emojify(message.message)}
      </p>
      {message.user === name || message.user === "admin" ? null : (
        <p className="sender">{message.user}</p>
      )}
    </div>
  );
};
