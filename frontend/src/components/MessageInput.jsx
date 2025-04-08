// src/components/MessageInput.jsx
import React, { useState } from "react";

function MessageInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    
      onSend(input);
      setInput("");
    
  };

  return (
    <div className="p-4 bg-white flex items-center">
      <input
        type="text"
        className="flex-1 p-2 border rounded mr-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button
        onClick={handleSend}
        className="bg-teal-600 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </div>
  );
}

export default MessageInput;
