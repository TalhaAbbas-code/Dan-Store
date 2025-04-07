import React from "react";
import { useForm } from "react-hook-form";

const RegForm = ({ btnClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    btnClick();
    console.log("Form Data:", data);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-50">
      <div className="bg-white px-10 py-4 shadow-lg w-[35%] rounded-md">
        <h2 className="text-3xl font-bold text-gray-800">Registration</h2>
        <p className="text-gray-600 mt-2">Please fill out the following</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
         
          <div>
            <label className="block text-gray-700 font-medium">
              Full Name*
            </label>
            <input
              {...register("fullName", { required: "Full name is required" })}
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

         
          <div>
            <label className="block text-gray-700 font-medium">
              Email (optional)
            </label>
            <input
              {...register("email", {
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Enter your email address"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          
          <p className="text-gray-600 font-medium mt-2">
            Bank Details (optional)
          </p>

          
          <div>
            <label className="block text-gray-700 font-medium">
              Account Title
            </label>
            <input
              {...register("accountTitle")}
              type="text"
              placeholder="Enter your account title"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          
          <div>
            <label className="block text-gray-700 font-medium">
              IBAN Number
            </label>
            <input
              {...register("ibanNumber")}
              type="text"
              placeholder="Enter your IBAN number"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          
          <div>
            <label className="block text-gray-700 font-medium">
              Upload Documents
            </label>
            <input
              {...register("documents")}
              type="file"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          
          <button
           
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-teal-700 transition"
          >
            Register
          </button>
        </form>

       
        <p
          onClick={btnClick}
          className="mt-4 text-center font-semibold text-gray-600 cursor-pointer hover:underline"
        >
          Skip for Now
        </p>
      </div>
    </div>
  );
};

export default RegForm;
