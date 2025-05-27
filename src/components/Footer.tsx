import React, { useEffect } from 'react';
import Image from 'next/image';
import { FaTwitter } from "react-icons/fa";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { AiFillTikTok } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS CSS

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Footer = ({ dict }: { dict: any }) => {
  useEffect(() => {
    // Initialize AOS on component mount
    AOS.init({
      duration: 1000, // Animation duration
      easing: 'ease-out', // Easing function
      once: true, // Allow animation to happen only once
    });
  }, []); // Empty array ensures it runs only once when the component mounts

  return (
    <footer className="bg-gray-900 text-white py-10 px-6 text-center">
      {/* Logo Section */}
      <div className="mb-6" data-aos="fade-up">
        <Image
          src="/logo.png"
          alt="WellFit Logo"
          width={100}
          height={100}
          className="mx-auto"
        />
      </div>

      {/* Social Media Icons */}
      <div className="flex flex-wrap justify-center items-center gap-6 mb-6" data-aos="fade-up" data-aos-delay="200">
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-600 text-2xl"
        >
          <FaFacebook /> {/* Facebook Icon */}
        </a>

        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-400 text-2xl"
        >
          <FaTwitter /> {/* Twitter Icon */}
        </a>

        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-600 text-2xl"
        >
          <FaInstagram /> {/* Instagram Icon */}
        </a>

        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-600 text-2xl"
        >
          <TbBrandYoutubeFilled /> {/* Youtube Icon */}
        </a>

        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-600 text-2xl"
        >
          <AiFillTikTok /> {/* TikTok Icon */}
        </a>

        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-600 text-2xl"
        >
          <FaTelegram /> {/* Telegram Icon */}
        </a>
      </div>

      {/* Newsletter Section */}
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4" data-aos="fade-up" data-aos-delay="400">
        {dict.footer?.newsletterTitle || "Newsletter Signup"}
      </h2>
      <p className="mb-6 text-gray-300 sm:text-lg lg:text-xl" data-aos="fade-up" data-aos-delay="500">
        {dict.footer?.newsletterDescription || "Stay informed about the upcoming phases of WellFit and the release of our whitepapers!"}
      </p>

      <form className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8" data-aos="fade-up" data-aos-delay="600">
        <input
          type="email"
          placeholder={dict.footer?.emailPlaceholder || "Enter your email address..."}
          className="px-4 py-2 rounded-full w-full max-w-md border border-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-400 transition mt-4 sm:mt-0"
        >
          {dict.footer?.subscribeButton || "Subscribe"}
        </button>
      </form>

      {/* Copyright Section */}
      <p className="text-gray-400 sm:text-lg lg:text-xl" data-aos="fade-up" data-aos-delay="700">
        {dict.footer?.copyright || "Copyright © 2024 All Rights Reserved"}
      </p>
    </footer>
  );
};

export default Footer;
