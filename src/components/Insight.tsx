/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS CSS

const Insight = ({ dict }: { dict: any }) => {
  useEffect(() => {
    // Initialize AOS when the component mounts
    AOS.init({
      duration: 1000, // Animation duration
      easing: 'ease-out', // Easing function
      once: true, // Animation happens only once
    });
  }, []); // Empty array ensures it runs only once when the component mounts

  return (
    <div id="Insight" className="container mx-auto px-6 sm:px-9 py-12 sm:py-20">
      <div className="flex flex-col lg:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden border">
        {/* Content Section */}
        <div className="flex-1 p-6">
          {/* Logo */}
          <div className="mb-4" data-aos="fade-up">
            <Image
              src="/logo.png"
              alt={dict.insight?.logoAlt || "WellFit Logo"}
              width={80}
              height={80}
              className="mx-auto lg:mx-0"
            />
          </div>
          {/* Title */}
          <h1
            className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-800 mb-4 text-center lg:text-left"
            data-aos="fade-up"
            data-aos-delay="200" // Delay for smooth animation sequencing
          >
            {dict.insight?.title || "An Exclusive Insight"}
          </h1>
          {/* Text Content */}
          <p
            className="text-gray-600 text-base sm:text-lg lg:text-lg leading-relaxed mb-4"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {dict.insight?.text1 || "There are rare moments when opportunities arise that have the potential to transform our lives profoundly —"}{' '}
            <strong className="font-semibold">{dict.insight?.wellfit || "WellFit"}</strong> {dict.insight?.isChance || "is precisely such a chance. Our vision is not just ambitious; it is revolutionary: we aim to connect"}
            <strong>{dict.insight?.health || "health"}</strong>, <strong>{dict.insight?.technology || "technology"}</strong>, and{' '}
            <strong>{dict.insight?.education || "education"}</strong> {dict.insight?.transformative || "in an entirely new and transformative way."}
          </p>
          <p
            className="text-gray-600 text-base sm:text-lg lg:text-lg leading-relaxed mb-4"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            {dict.insight?.text2 || "Imagine leveraging cutting-edge technologies — from"} <strong>{dict.insight?.ai || "artificial intelligence"}</strong> {" to "}
            <strong>{dict.insight?.ar || "augmented reality"}</strong> {dict.insight?.enhance || "— that not only expand our knowledge but also significantly enhance our well-being."} <strong>{dict.insight?.wellfit || "WellFit"}</strong> {dict.insight?.movement || "is more than a project; it is a movement redefining how we learn, move, and interact with each other."}
          </p>
          <p
            className="text-gray-600 text-base sm:text-lg lg:text-lg leading-relaxed mb-4"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            {dict.insight?.text3 || "With a"} <strong>{dict.insight?.holistic || "holistic approach"}</strong>, {dict.insight?.aspire || "we aspire to enrich peoples daily lives, motivating them to achieve"}
            {dict.insight?.goals || "their goals, lead healthier lives, and enjoy the process."} {dict.insight?.interactive || "We focus on"}
            <strong>{dict.insight?.interactiveExperiences || "interactive experiences"}</strong> {dict.insight?.innovation || "that blend innovation and"} <strong>{dict.insight?.sustainability || "sustainability"}</strong>, {dict.insight?.positiveChange || "creating a platform that not only inspires but also drives positive change worldwide."}
          </p>
          <p
            className="text-gray-600 text-base sm:text-lg lg:text-lg leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="1000"
          >
            {dict.insight?.text4 || "This is more than an idea — its the beginning of a new era."}
          </p>
        </div>

        {/* Image Section */}
        <div className="flex-1" data-aos="fade-left" data-aos-delay="400">
          <Image
            src="/Insight.svg"
            alt={dict.insight?.imageAlt || "Futuristic Insight"}
            width={1238}
            height={682}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Insight;
