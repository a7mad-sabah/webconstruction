

import React, { useEffect, useRef, useState } from "react";
import Testimonials from "../Components/Testimonials";

export default function Home() {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200",
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1743819344477-3b67c19621e9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const logos = [
    "/public/logos/1.png",
    "/public/logos/2.png",
    "/public/logos/3.png",
    "/public/logos/4.png",
    "/public/logos/5.png",
    "/public/logos/6.png",
    "/public/logos/7.png",
    "/public/logos/8.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    if (sliderRef.current) {
      const width = sliderRef.current.clientWidth;
      sliderRef.current.style.transform = `translateX(-${
        currentSlide * width
      }px)`;
    }
  }, [currentSlide]);

  return (
    <div className="bg-[url(https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradientBackground.png)] text-sm text-gray-500 min-h-screen">
      {/* SLIDER */}
      <div className="flex justify-center pt-5">
        <div className="w-[92%] max-w-5xl overflow-hidden relative rounded-xl shadow-lg">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out"
          >
            {slides.map((img, index) => (
              <img
                key={index}
                src={img}
                className="w-full h-[80px] md:h-[100px] object-cover flex-shrink-0"
                alt={`Slide ${index}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* HERO */}
      <div className="min-h-[300px] py-16 flex flex-col items-center justify-center px-4 text-center">
        <div className="relative z-0 bg-black overflow-hidden p-px flex items-center justify-center rounded-full">
          <div className="flex items-center gap-3 px-5 py-3 bg-gray-900/80 backdrop-blur rounded-full">
            <span className="text-xs text-white/80 ">
              دەستی زێڕین - پلاتفۆرمی کارمەندانی بیناسازی
            </span>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
          </div>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold max-w-4xl text-gray-800 mt-6 leading-snug">
          بە ئاسانی کارمەندانی شارەزای بیناسازی بدۆزەرەوە
        </h1>{" "}
        <p className="max-w-xl mt-6 text-gray-600 font-rudawregular2">
          دەستی زێڕین تۆ دەبەستێت بە کارمەندانی پیشەیی، یارمەتی بەڕێوەبردنی
          پرۆژەکانت دەدات و کاروباری بیناسازیت بە شێوەیەکی زیرەک پەرە پێدەدات
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={() => navigate("/login")}
            className="px-7 py-3 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
          >
            دەستپێبکە
          </button>

          <button
            onClick={() => navigate("/workers")}
            className="px-7 py-3 rounded border border-gray-400 hover:bg-gray-100 transition"
          >
            کارمەندان ببینە
          </button>
        </div>
      </div>

      {/* LOGOS */}
      <div className="relative w-full overflow-hidden mt-5 pb-10">
        <div className="absolute left-0 top-0 h-full w-28 z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-28 z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee will-change-transform">
          {[...logos, ...logos].map((logo, i) => (
            <img
              key={i}
              src={logo}
              className="h-10 mx-12 object-contain grayscale hover:grayscale-0 transition duration-300"
              alt="company logo"
            />
          ))}
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 20s linear infinite;
          }
        `}</style>
      </div>

      {/* TESTIMONIALS (NEW ) */}
      <Testimonials />
    </div>
  );
}