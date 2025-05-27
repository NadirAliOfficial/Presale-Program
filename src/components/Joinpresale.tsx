/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS CSS

const Joinpresale = ({ dict }: { dict: any }) => {
  useEffect(() => {
    // Initialize AOS when the component mounts
    AOS.init({
      duration: 1000,
      easing: 'ease-out',
      once: true,
    });
  }, []);

  return (
    <section className="bg-blue-500 mb-11 text-white p-6 sm:p-8 md:p-12 rounded-lg flex flex-col md:flex-row items-center justify-between">
      {/* Left Text Section */}
      <div
        className="w-full md:w-1/2 mb-6 md:mb-0 text-center md:text-left"
        data-aos="fade-right"
        data-aos-delay="200"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          {dict.joinpresale?.headline1 || "Don’t miss your chance"} <br />
          <span className="text-yellow-300">
            {dict.joinpresale?.highlight || "become part of WellFit"}
          </span>{" "}
          {dict.joinpresale?.headline2 || "and actively shape the future!"}
        </h1>

        <Link href="/Presale" passHref>
          <button
            className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {dict.joinpresale?.buttonText || "Join Now The Pre-Sale"}
          </button>
        </Link>
      </div>

      {/* Right Image Section */}
      <div
        className="w-full md:w-1/2 flex justify-center"
        data-aos="fade-left"
        data-aos-delay="600"
      >
        <div className="relative w-full md:w-80 h-64 sm:h-80 md:h-80">
          <Image
            src="/Joinpresale.svg"
            alt={dict.joinpresale?.imageAlt || "Illustration of a WellFit promotion"}
            layout="intrinsic" // This will ensure the image maintains its aspect ratio
            width={400}
            height={400}
            className="object-contain rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Joinpresale;
