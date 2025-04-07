export const RoleButton = ({ role, image, selectedRole, handleRole }) => {
  return (
    <div
      onClick={() => handleRole(role)}
      className={`border-2 p-7 flex justify-center items-center flex-col cursor-pointer transition-all duration-300 
        ${selectedRole === role ? "bg-primary text-white" : ""} 
        hover:bg-teal-600 hover:text-white group`}
    >
      <img
        src={image}
        alt={role}
        className={`w-[70%] h-full object-cover transition-all duration-300
          ${selectedRole === role ? "brightness-0 invert" : ""}
          group-hover:brightness-0 group-hover:invert`}
      />
      <p className="text-center font-semibold mt-2">{role}</p>
    </div>
  );
};
