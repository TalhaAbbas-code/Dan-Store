import React from "react";
import { IK } from "../assets/images"; 

function Sidebar({ users, selectUser, selectedUser }) {
  return (
    <div className="w-1/4 bg-gray-100 p-4">
      <h2 className="text-lg font-semibold mb-4">Admin</h2>
      {users.map((user) => (
        <div
          key={user.id}
          className={`p-3 mb-2 rounded flex cursor-pointer ${
            selectedUser.id === user.id ? "bg-teal-500 text-white" : "bg-white"
          }`}
          onClick={() => selectUser(user)}
        >
         
          <img
            src={IK}
            alt={user.name}
            className="w-12 h-12 rounded-full mr-3"
          />

          <div className="flex flex-col">
            <p className="font-bold">{user.name}</p>
            <p className="text-sm text-gray-500">{user.produce}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
