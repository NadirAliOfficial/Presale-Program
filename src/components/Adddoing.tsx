/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS CSS

const Adddoing = ({ dict }: { dict: any }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: "ease-out", 
      once: true, 
    });
  }, []); 

  return (
    <div
      id="Adddoing"
      className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12 sm:px-12"
    >
      {/* Logo Section */}
      <div className="mb-8">
        <Image
          src="/logo.png" 
          alt="WellFit"
          width={80}
          height={80}
          className="mx-auto"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl text-center">
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800"
          data-aos="fade-up" // AOS animation for fade-up effect
        >
          {dict.adddoing?.mainHeading || "Your active contribution to health and education"}
        </h1>
        <p
          className="mt-6 text-lg sm:text-xl text-gray-600"
          data-aos="fade-up"
          data-aos-delay="200" // Adding a delay for smooth sequence of animations
        >
          {dict.adddoing?.description ||
            "WellFit goes beyond theory: our \"learning by doing\" approach offers you interactive experiences that directly improve your health, fitness and skills. Whether in parks, museums, zoos or at home - with WellFit you can track your activities, receive personalized feedback and continuously learn and grow."}
        </p>
        <p
          className="mt-4 text-lg sm:text-xl text-gray-600"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          {dict.adddoing?.vision ||
            "Our vision is to make technology, health and education accessible everywhere - no matter where you are."}
        </p>
      </div>

      {/* Grid Layout for Images and Text */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 max-w-6xl">
        {/* Museums */}
        <div
          className="bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center p-4"
          data-aos="fade-up" // AOS animation for fade-up effect
        >
          <Image
            src="/Museum.svg"
            alt="Museums"
            width={295}
            height={195}
            className="rounded-lg object-contain w-full max-w-xs sm:max-w-full"
          />
          <h3 className="text-center mt-6 text-xl font-semibold text-green-600">
            {dict.adddoing?.museum || "Museums"}
          </h3>
          <p className="text-center mt-3 text-sm sm:text-base text-gray-600">
            {dict.adddoing?.museumDescription ||
              "Experience the captivating fusion of technology, art, and history through a unique interactive journey."}
          </p>
        </div>

        {/* Parks & Trails */}
        <div
          className="bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center p-4"
          data-aos="fade-up" // AOS animation for fade-up effect
          data-aos-delay="200"
        >
          <Image
            src="/Park.svg"
            alt="Parks & Trails"
            width={295}
            height={195}
            className="rounded-lg object-contain w-full max-w-xs sm:max-w-full"
          />
          <h3 className="text-center mt-6 text-xl font-semibold text-green-600">
            {dict.adddoing?.parks || "Parks & Trails"}
          </h3>
          <p className="text-center mt-3 text-sm sm:text-base text-gray-600">
            {dict.adddoing?.parksDescription ||
              "On every outing, you will expand your knowledge about our wonderful \"Mother Nature.\"" }
          </p>
        </div>

        {/* At Home */}
        <div
          className="bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center p-4"
          data-aos="fade-up" // AOS animation for fade-up effect
          data-aos-delay="400"
        >
          <Image
            src="/Home.svg"
            alt="At home"
            width={295}
            height={195}
            className="rounded-lg object-contain w-full max-w-xs sm:max-w-full"
          />
          <h3 className="text-center mt-6 text-xl font-semibold text-green-600">
            {dict.adddoing?.home || "At Home"}
          </h3>
          <p className="text-center mt-3 text-sm sm:text-base text-gray-600">
            {dict.adddoing?.homeDescription ||
              "Use personalized applications to optimize your fitness and knowledge from the comfort of your own home."}
          </p>
        </div>

        {/* Zoos */}
        <div
          className="bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center p-4"
          data-aos="fade-up" // AOS animation for fade-up effect
          data-aos-delay="600"
        >
          <Image
            src="/zoos.svg"
            alt="Zoos"
            width={295}
            height={195}
            className="rounded-lg object-contain w-full max-w-xs sm:max-w-full"
          />
          <h3 className="text-center mt-6 text-xl font-semibold text-green-600">
            {dict.adddoing?.zoos || "Zoos"}
          </h3>
          <p className="text-center mt-3 text-sm sm:text-base text-gray-600">
            {dict.adddoing?.zoosDescription ||
              "WellFit will deepen your understanding of a wide variety of animal species."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Adddoing;
