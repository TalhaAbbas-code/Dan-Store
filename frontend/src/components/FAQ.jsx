import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { faqs } from "../constants/faqs";
import { playstore, apple } from "../assets/images";
import DownloadButton from "./DownloadButton";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false); 

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 text-center">
     
      <h2 className="text-2xl font-bold">FAQ</h2>
      <p className="text-gray-500 mb-6">Need Help?</p>

     
      <div className="space-y-3">
        {faqs.slice(0, showAll ? faqs.length : 4).map((faq, index) => (
          <div
            key={index}
            className={`border border-primary rounded-md ${
              openIndex === index ? "bg-gray-100" : "bg-white"
            } `}
          >
            <button
              className="w-full flex justify-between items-center p-4 text-gray-600 text-left text-lg font-semibold"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openIndex === index ? (
                <FaMinus className="text-primary" />
              ) : (
                <FaPlus className="text-primary" />
              )}
            </button>
            {openIndex === index && (
              <div className="p-4 text-left text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>

    
      {faqs.length > 4 && (
        <button
          className="bg-primary text-white px-6 py-2 rounded-md mt-6"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "View Less" : "View More"}
        </button>
      )}

      
      <div className="mt-8 p-6 flex items-center justify-between gap-5">
        <p className="font-semibold text-2xl">Download the App</p>
        <div className="flex gap-3">
          <DownloadButton
            image={playstore}
            p1="ANDROID APP ON"
            p2="Google Play"
          />
          <DownloadButton image={apple} p1="IOS APP ON" p2="App Store" />
        </div>
      </div>
    </div>
  );
};

export default FAQ;
