import { useRef, useEffect } from "react";
import { Message } from "./message/message";

export const Messages = (prop) => {
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <div ref={divRef}>
      {prop.messages.map((message, i) => {
        return (
          <div key={i}>
            <Message message={message} name={prop.name} />
          </div>
        );
      })}
    </div>
  );
};
