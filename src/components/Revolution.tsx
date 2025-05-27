/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import Image from 'next/image';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS

const Revolution = ({ dict }: { dict: any }) => {
  useEffect(() => {
    // Initialize AOS on component mount
    AOS.init({
      duration: 1000, // Animation duration
      easing: 'ease-out', // Easing function
      once: true, // Animation happens only once
    });
  }, []);

  return (
    <div id="Revolution" className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden border">
        {/* Left Section - Image */}
        <div
          className="flex-1 p-4"
          data-aos="fade-right" // Adding AOS animation
        >
          <Image
            src="/Revolution.svg" // Replace with your image path
            alt={dict.revolution?.imageAlt || "Early Supporters Joining"}
            width={600}
            height={774}
            className="rounded-lg w-full h-auto" // Ensures responsiveness
          />
        </div>

        {/* Right Section - Text */}
        <div
          className="flex-1 p-6"
          data-aos="fade-left" // Adding AOS animation
        >
          {/* Logo */}
          <div className="mb-2" data-aos="fade-up">
            <Image
              src="/logo.png"
              alt={dict.revolution?.logoAlt || "WellFit Logo"}
              width={80}
              height={80}
              className="mx-auto lg:mx-0"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4" data-aos="fade-up">
            {dict.revolution?.title || "Be part of the revolution – right from the start"}
          </h1>

          <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-4" data-aos="fade-up">
            {dict.revolution?.intro || "We stay right now on our turning point where technology, innovation, health be combinated. After our pre-sale we will register our patent to protect and secure the exlusivite of our vision. Be part of our long term WellFit innovation. Be one of the early WellFit phase and you get an exclusive benefits and you safe your movement in the new worldwide standards."}
          </p>

          <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-4" data-aos="fade-up">
            {dict.revolution?.investmentOpportunity || "We recently turned down a viable investment opportunity that would have cost us 50% of the shares. Why? Because we believe in our vision and don’t want to sacrifice it for short-term gains. Your investment will help us achieve our long-term goals and keep WellFit in the hands of those who believe in sustainable change - like you."}
          </p>

          <ul className="list-disc pl-6 mb-4" data-aos="fade-up">
            <li>{dict.revolution?.exclusiveAccess || "Exclusive access through advance booking"}</li>
            <li>{dict.revolution?.earlyParticipation || "Early participation brings special advantages"}</li>
            <li>{dict.revolution?.support || "Your support helps protect our values ​​and vision"}</li>
          </ul>

          <button
            className="bg-yellow-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-yellow-600 transition duration-300"
            data-aos="zoom-in" // Adding a zoom-in effect to the button
          >
            {dict.revolution?.button || "WellFit now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Revolution;
