import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Modal from "./Modal";
import * as images from "../assets/images";
import RegForm from "./RegForm.jsx";
import { menuItems, navLinks } from "../constants/navLinks";
import Danlogo from "../assets/images/DAN logo.png";
import { RoleButton } from "./RoleButton.jsx";
import OtpInput from "react-otp-input";
import * as AuthApi from "../api/AuthRequests.js";

const Navbar = () => {
  const [language, setLanguage] = useState("ENG");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [countryCode, setCountryCode] = useState("+966");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [timer, setTimer] = useState(60);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [data, setData] = useState();

  const handleRole = (role) => {
    setSelectedRole(role);
  };
  const toggleLanguage = () => {
    setLanguage(language === "ENG" ? "عربي" : "ENG");
  };

  const handleLogin = (action) => {
    setIsOpen(true);
  };
  
  //for otp timer
  useEffect(() => {
    let countdown;

    if (step === 2) {
      setTimer(60);

      countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [step]);
  //formt otp timer
  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div>
      <nav className="bg-primary text-white px-6 py-4 flex justify-between items-center">
        <div className="lg:pl-[10%]">
          <img src={Danlogo} alt="Logo" className="w-12 h-12" />
        </div>

        <div className="hidden justify-end lg:flex lg:gap-10 gap-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="flex items-center gap-2 hover:text-gray-300"
            >
              {item.icon} {item.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-5">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={() => handleLogin(link.action)}
              className="flex items-center gap-2 hover:text-gray-300"
            >
              {link.icon} {link.label}
            </a>
          ))}
          {/* language Toggle*/}
          <div
            className="w-28 h-10 flex  items-center bg-gray-300 rounded-full p-1 cursor-pointer relative"
            onClick={toggleLanguage}
          >
            <div
              className={`w-12 h-8 bg-white rounded-full shadow-md flex justify-between items-center  
            transform transition-all duration-300 ${
              language === "ENG" ? "translate-x-0" : "translate-x-full"
            }`}
            />
            <span
              className={`absolute left-4 text-gray-600 text-sm ${
                language === "ENG" ? "font-semibold text-primary" : "opacity-50"
              }`}
            >
              ENG
            </span>
            <span
              className={`absolute right-4 text-gray-600 text-sm ${
                language === "عربي"
                  ? "font-semibold text-primary"
                  : "opacity-50"
              }`}
            >
              عربي
            </span>
          </div>
        </div>

        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        {/* Mobile Menu  */}

        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-gray-800 p-4 flex flex-col items-center space-y-4 md:hidden">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="flex items-center gap-2 hover:text-gray-300"
              >
                {item.icon} {item.name}
              </a>
            ))}

            <div className="flex flex-col space-y-3 mt-4">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={link.onClick ? link.onClick : undefined}
                  className="flex items-center gap-2 hover:text-gray-300"
                >
                  {link.icon} {link.label}
                </a>
              ))}
            </div>
            <div
              className="w-28 h-10 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer relative mt-4"
              onClick={toggleLanguage}
            >
              <div
                className={`w-14 h-8 bg-white rounded-full shadow-md flex items-center justify-center 
              transform transition-all duration-300 ${
                language === "ENG" ? "translate-x-0" : "translate-x-full"
              }`}
              />
              <span
                className={`absolute left-4 text-gray-600 text-sm ${
                  language === "ENG"
                    ? "font-semibold text-primary"
                    : "opacity-50"
                }`}
              >
                ENG
              </span>
              <span
                className={`absolute right-4 text-gray-600 text-sm ${
                  language === "عربي"
                    ? "font-semibold text-primary"
                    : "opacity-50"
                }`}
              >
                عربي
              </span>
            </div>
          </div>
        )}
      </nav>
      {/* Welcome entre phonenumber  */}
      {step === 1 && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setStep(1);
          }}
          title="WELCOME TO DAN"
          subTittle="Entre your mobile number to continue"
          footerText={
            <>
              By signing in I agree to the{" "}
              <span className="font-bold">Terms of Use</span> at DAN
            </>
          }
          btnClick={async () => {
            if (phoneNumber.length === 11) {
              const payload = {
                mobileNumber: phoneNumber,
                deviceToken: " ",
                isDevelopment: true,
              };

              try {
                const response = await AuthApi.SendOtp(payload);
                console.log(response.data);
                if (response.data?.isSuccessful && response.data?.statusCode === 200) {
                  setGeneratedOtp(response.data.response.response);
                  setStep(2);
                }
              } catch (error) {
                console.error("Error sending OTP:", error);
              }
            } else {
              alert("Please enter correct 11 digit phone number");
            }
          }}
        >
          <div className="p-5 flex border-2 mt-[10%]">
            <div className="flex items-center gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="bg-transparent outline-none text-gray-700 cursor-pointer"
              >
                <option value="+966">+92</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+91">+91</option>
              </select>
            </div>

            <span className="border-l border-gray-400 h-5 mx-2"></span>

            <input
              type="text"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="outline-none flex-1 text-gray-700"
            />
          </div>
        </Modal>
      )}
      {/* OTP verification  */}
      {step === 2 && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setStep(1);
          }}
          title="ENTER OTP"
          subTittle={`Verify your number by entering the 4 digit code sent to ${phoneNumber}`}
          footerText={
            <>
              By signing in I agree to the{" "}
              <span className="font-bold">Terms of Use</span> at DAN
            </>
          }
          btnClick={async() => {
            const isValidTime = timer > 0;

            if ( isValidTime) {
               const payload = {
                 mobileNumber: phoneNumber,
                 otp:generatedOtp,
                 
               };

               try {
                 const response = await AuthApi.AuthenticateMobileUser(payload);
                 console.log(response.data);
                 if (
                   response.data?.isSuccessful &&
                   response.data?.statusCode === 200
                 ) {
                   const token = response.data.response.access;
                   localStorage.setItem("authToken", token);
                 
                   setStep(3);
                 }
               } catch (error) {
                 console.error( error);
               }

              
            }  else {
               alert("OTP expired. Please request a new one.");
            }
          }}
        >
          {/* for otp */}
          <div className="flex justify-center mt-4">
            <OtpInput
              value={otp}
              onChange={(val) => setOtp(val)}
              numInputs={4}
              isInputNum
              shouldAutoFocus
              inputStyle={{
                width: "3rem",
                height: "3rem",
                fontSize: "1.5rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                textAlign: "center",
                margin: "0 0.5rem",
              }}
            />
          </div>

          <p className="text-xs text-center text-gray-600 mt-5">
            OTP will expire in{" "}
            <span className="font-bold">{formatTime(timer)}</span>
          </p>
        </Modal>
      )}
      {/* Select role  */}
      {step === 3 && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setStep(1);
          }}
          title="Welcome to DAN"
          subTittle="Please select one of the following"
          btnClick={() => setStep(4)}
        >
          <div className="flex gap-3 justify-center">
            <RoleButton
              role="Supplier"
              image={images.supplier}
              selectedRole={selectedRole}
              handleRole={handleRole}
            />
            <RoleButton
              role="Trader"
              image={images.trader}
              selectedRole={selectedRole}
              handleRole={handleRole}
            />
          </div>
        </Modal>
      )}
      {/* Registration Form */}
      {step === 4 && <RegForm btnClick={() => setStep(5)}></RegForm>}
      {/* Registration Successful */}
      {step === 5 && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          footerText="Your Account verification isi in progress.You'll recive a notification and/or E-mail once approved by Admin"
          btnClick={() => {
            setIsOpen(false);
            setStep(1);
          }}
        >
          <div className=" flex justify-center">
            <img
              src={images.registrationSuccess}
              alt="Logo"
              className="w-[30%]  h-full object-cover "
            />
          </div>
          <p className="text-2xl font-semibold text-center">
            Registration Successful!
          </p>
        </Modal>
      )}
    </div>
  );
};

export default Navbar;
