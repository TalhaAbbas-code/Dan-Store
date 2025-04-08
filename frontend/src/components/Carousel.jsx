import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import * as images from "../assets/images"

const Carousel = () => {
  const slides = [
    {
      id: 1,
      title: "Discover Exciting Auctions!",
      buttonText: "Explore More",
      image: images.slider1 
    },
    {
      id: 2,
      title: "Fresh Fruits & Vegetables",
      buttonText: "Shop Now",
      image: images.slider2
    },
    {
      id: 3,
      title: "Best Deals on Organic Food",
      buttonText: "Get Deals",
      image: images.slider3
    },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
     
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop
      className="w-full "
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id} className="relative">
          <div className="relative w-[100vw] h-[70vh] flex items-center justify-center bg-white">
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute top-0 left-0 w-full h-full object-cover opacity-100"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-center p-10 bg-white/50">
             
             
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
