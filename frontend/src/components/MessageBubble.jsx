import React from "react";
import { IK } from "../assets/images"; 

function MessageBubble({ message }) {
  const bubbleClass = message.fromSelf
    ? "bg-teal-600 text-white self-end"
    : "bg-gray-300 self-start";

  return (
    <div className={`p-2 flex rounded max-w-[20%] ${bubbleClass}`}>
      <img src={IK} alt={"imagesd"} className="w-12 h-12 rounded-full mr-3" />
      <div className="flex flex-col">
        <p className="whitespace-pre-wrap break-words">{message.text}</p>
        <p className="text-xs block text-right">{message.time}</p>
      </div>
    </div>
  );
}

export default MessageBubble;
