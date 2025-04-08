// src/components/ChatWindow.jsx
import React from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

function ChatWindow({ selectedUser, messages, onSendMessage }) {
  return (
    <div className="w-3/4 flex flex-col">
      <div className="bg-white p-4 border-b shadow-sm">
        <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
        <p className="text-sm text-gray-500">Last Active: 5 min ago</p>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50 flex flex-col">
        {messages   
          .filter(
            (msg) =>
              msg.senderId === selectedUser.id ||
              msg.receiverId === selectedUser.id
          )
          .map((msg, idx) => (
            <MessageBubble key={idx} message={msg} />
          ))}
      </div>

      <MessageInput onSend={onSendMessage} />
    </div>
  );
}

export default ChatWindow;
