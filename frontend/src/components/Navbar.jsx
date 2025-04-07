import { useState } from "react";
import {
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Modal from "./Modal";
import * as images from "../assets/images";
import RegForm from "./RegForm.jsx"
import { menuItems, navLinks } from "../constants/navLinks";
import Danlogo from "../assets/images/DAN logo.png";
import { RoleButton } from "./RoleButton.jsx";

const Navbar = () => {
  const [language, setLanguage] = useState("ENG");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [countryCode, setCountryCode] = useState("+966");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRole = (role) => {
    setSelectedRole(role);
  };
  const toggleLanguage = () => {
    setLanguage(language === "ENG" ? "عربي" : "ENG");
  };
 
  const handleClick = (action) => {
   
     setIsOpen(true); 
    
  };
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; 

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    
    if (value && index < otp.length - 1) {
      document.getElementById(`${index + 1}`).focus();
    }
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
              onClick={() => handleClick(link.action)}
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
      {step === 1 && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setStep(0);
          }}
          title="WELCOME TO DAN"
          subTittle="Entre your mobile number to continue"
          footerText={
            <>
              By signing in I agree to the{" "}
              <span className="font-bold">Terms of Use</span> at DAN
            </>
          }
          btnClick={() => setStep(2)}
        >
          <div className="p-5 flex border-2 mt-[10%]">
            <div className="flex items-center gap-2">
              <img
                src="https://flagcdn.com/w40/sa.png"
                alt="Saudi Arabia Flag"
                className="w-6 h-4"
              />
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="bg-transparent outline-none text-gray-700 cursor-pointer"
              >
                <option value="+966">+966</option>
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
      {step === 2 && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setStep(0);
          }}
          title="ENTRE OTP"
          subTittle={`Verify your number by entering the 4 digit code send to ${phoneNumber}`}
          footerText={
            <>
              By signing in I agree to the{" "}
              <span className="font-bold">Terms of Use</span> at DAN
            </>
          }
          btnClick={() => setStep(3)}
        >
          <div className="flex justify-center gap-[10%] mt-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-12 h-12 text-center border border-gray-400 rounded-md text-lg"
              />
            ))}
          </div>

          <p className="text-xs text-center text-gray-600 mt-5">
            OTP will expire in <span className="font-bold">01:00</span>
          </p>
        </Modal>
      )}
      {step === 3 && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setStep(0);
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
      {step === 4 && <RegForm btnClick={() => setStep(5)}></RegForm>}
      {step === 5 && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
           
            setIsOpen(false);
            
          }}
          footerText="Your Account verification isi in progress.You'll recive a notification and/or E-mail once approved by Admin"
          btnClick={() =>{
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
