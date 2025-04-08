import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import { io } from "socket.io-client";


const staticUsers = [
  { id: "1", name: "DAN-123", produce: "Tomatoes" },
  { id: "2", name: "DAN-124", produce: "Mangoes" },
  { id: "3", name: "DAN-125", produce: "Bananas" },
  { id: "4", name: "DAN-126", produce: "Oranges" },
];

const socket = io("http://localhost:8800");

function Chat() {
  const [currentUser, setCurrentUser] = useState(null); 
  const [selectedUser, setSelectedUser] = useState(staticUsers[0]); 
  const [messages, setMessages] = useState([]);
  const [userForm, setUserForm] = useState({
    id: "",
    name: "",
    produce: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (userForm.id && userForm.name && userForm.produce) {
      setCurrentUser(userForm); 
    } else {
      alert("Please fill out all fields.");
    }
  };

  useEffect(() => {
    if (currentUser) {
      socket.emit("new-user-add", currentUser.id);
      socket.on("recieve-message", (data) => {
        setMessages((prev) => [...prev, { ...data, fromSelf: false }]);
      });

      return () => {
        socket.off("recieve-message");
      };
    }
  }, [currentUser]);

  const sendMessage = (message) => {
    const data = {
      senderId: currentUser.id,
      receiverId: selectedUser.id,
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    socket.emit("send-message", data);
    setMessages((prev) => [...prev, { ...data, fromSelf: true }]);
  };

  return (
    <div className="flex h-[90vh]">
     
      {!currentUser ? (
        <div className="flex justify-center items-center h-full">
          <form
            onSubmit={handleFormSubmit}
            className="bg-white p-4 rounded shadow-md"
          >
            <h2 className="text-lg font-semibold mb-4">Enter Your Details</h2>
            <div className="mb-2">
              <label htmlFor="id" className="block text-sm font-medium">
                User ID
              </label>
              <input
                type="text"
                id="id"
                name="id"
                value={userForm.id}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userForm.name}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="produce" className="block text-sm font-medium">
                Produce
              </label>
              <input
                type="text"
                id="produce"
                name="produce"
                value={userForm.produce}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded w-full mt-4"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        
        <>
          <Sidebar
            users={staticUsers}
            selectUser={setSelectedUser}
            selectedUser={selectedUser}
          />
          <ChatWindow
            selectedUser={selectedUser}
            messages={messages}
            onSendMessage={sendMessage}
          />
        </>
      )}
    </div>
  );
}

export default Chat;
