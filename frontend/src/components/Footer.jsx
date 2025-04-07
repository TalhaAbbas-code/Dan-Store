import React from "react";
import Danlogo from "../assets/images/Group 11.png";
import {
  companyLinks,
  supportLinks,
  socialLinks,
} from "../constants/footerLinks";




const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8">
      <div className=" mx-auto px-6 lg:px-16 flex flex-wrap gap-5 max-sm:justify-center sm:flex-row justify-between items-center sm:items-start">
        <div className="flex flex-col mb-6 lg:mb-0">
          <img src={Danlogo} alt="Logo" className="w-16 h-16" />
          <h1 className="text-3xl font-bold tracking-wide">DAN</h1>
        </div>

        <FooterLinks title="Company" links={companyLinks} />
        <FooterLinks title="Support" links={supportLinks} />

        <div className="text-center flex flex-col justify-end lg:text-left">
          <h2 className="font-bold text-lg">Social Media</h2>
          <p className="text-sm mt-2">Follow Us.</p>
          <p className="text-sm mt-2">Stay connected through social media.</p>
          <div className="flex justify-between  mt-3">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-white hover:text-gray-300"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-sm mt-6 border-t border-gray-500 pt-4">
        © 2024 DAN. All Rights Reserved
      </div>
    </footer>
  );
};

// Reusable Footer Links Component
const FooterLinks = ({ title, links }) => (
  <div className="text-center lg:text-left">
    <h2 className="font-bold text-lg">{title}</h2>
    <ul className="mt-2 ">
      {links.map((link, index) => (
        <li key={index}>
          <a href={link.href} className="hover:underline">
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
