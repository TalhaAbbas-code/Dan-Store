import { HiOutlineShoppingCart } from "react-icons/hi2";
import { PiChatCircleTextLight } from "react-icons/pi";
import { BsBoxSeam } from "react-icons/bs";
import { TfiHome } from "react-icons/tfi";
import {
  FaUser,
  FaSignInAlt,
} from "react-icons/fa";

export const menuItems = [
  { name: "Home", icon: <TfiHome size={19} />, link: "/" },
  {
    name: "Market Place",
    icon: <HiOutlineShoppingCart size={18} />,
    link: "/marketplace",
  },
  { name: "Chats", icon: <PiChatCircleTextLight size={21} />, link: "chat" },
  { name: "My Trades", icon: <BsBoxSeam size={17} />, link: "#" },
];
export const navLinks = [
  {
    label: "Login",
    icon: <FaSignInAlt />,
    action: "login" ,
    href: "#",
  },
  {
    label: "Signup",
    icon: <FaUser />,
   action: "login", 
    href: "#",
  },
];
