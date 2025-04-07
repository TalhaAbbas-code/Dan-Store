import React from "react";

const Modal = ({ isOpen, onClose, title,subTittle,footerText, btnText="Next",btnClick, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed font-sans text-[#444444] inset-0 flex items-center justify-center   bg-black  bg-opacity-20 z-50">
      <div className="bg-white dark:bg-gray-800 p-10  shadow-2xl shadow-slate-500 overflow-y-scroll   max-w-[70%] max-h-[90%] ">
        {/* Modal Header */}
        <div className="flex justify-between items-center   pb-2">
          <h2 className="text-2xl text-[#444444] font-sans">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500  hover:text-gray-700"
          >
            ✖
          </button>
        </div>
        <p>{subTittle}</p>

        {/* Modal Content */}
        <div className="mt-1">{children}</div>
        <p className=" text-center ">{footerText}</p>

        {/* Modal Footer */}
        <div className="mt-5 rounded-sm flex justify-end">
          <button
            onClick={btnClick}
            className="bg-primary w-full text-white px-4 py-4 text-lg rounded hover:bg-teal-700"
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
