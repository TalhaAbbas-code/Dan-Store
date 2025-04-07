import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import * as images from "../assets/images"

const slides = [
  {
    id: 1,
    title: "Discover Exciting Auctions!",
    buttons: [
      {
        text: "Explore More",
        image: null,
        position:
          "bottom-5 left-5 font-bold text-green-600 sm:bottom-10 sm:left-10 md:bottom-16 md:left-16",
      },
    ],
    image: images.slider1,
  },
  {
    id: 2,
    title: "Fresh Fruits & Vegetables",
    buttons: [
      {
        text: "Android app on Play Store",
        image: images.playstore,
        position: "bottom-12 left-[45%] max-lg:bottom-14 sm:left-[40%]",
        background: "bg-black",
        textcolor: "text-white",
      },
      {
        text: "IOS app on App Store",
        image: images.apple,
        position: "bottom-12 left-[65%]  max-lg:left-[45%] max-lg:bottom-0   ",
        background: "bg-black",
        textcolor: "text-white",
      },
    ],
    image: images.slider2,
  },
  {
    id: 3,
    image: images.slider3,
  },
  {
    id: 4,
    image: images.slider4,
  },
];


const CarouselMain = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex items-center flex-col gap-5 ">
      {/* Image Slides */}
      <div className="relative w-[100vw] h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-center "
            />

            
           
              
              {slide.buttons &&
                slide.buttons.map((button, btnIndex) => (
                  <button
                    key={btnIndex}
                    className={`absolute  border-green-900 hover:bg-green-900 hover:text-white ${
                      button.position
                    } flex  items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 border-2 transition rounded-md text-sm sm:text-base md:text-lg ${
                      button.background || "bg-transparent"
                    } ${button.textcolor || "text-teal-700"}`}
                  >
                    {button.image && (
                      <img
                        src={button.image}
                        alt="icon"
                        className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6"
                      />
                    )}
                    {button.text}
                  </button>
                ))}
            
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="transform -translate-x-1/2 flex gap-2 mb-[2%]">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              index === currentSlide ? "bg-green-700" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselMain;
