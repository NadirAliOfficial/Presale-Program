/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import Image from 'next/image';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS

const Shaping = ({ dict }: { dict: any }) => {
  useEffect(() => {
    // Initialize AOS on component mount
    AOS.init({
      duration: 1000, // Animation duration
      easing: 'ease-out', // Easing function
      once: true, // Animation happens only once
    });
  }, []);

  return (
    <section
      className="bg-white px-6 py-12 sm:px-12 lg:px-20 lg:py-20 flex flex-col items-center gap-8 rounded-lg"
      data-aos="fade-up" // Adding fade-up animation to the whole section
    >
      <div className="flex flex-col lg:flex-row items-center gap-8">
        
        {/* Image Section */}
        <div className="flex-1 w-full" data-aos="fade-left">
          <Image
            src="/Shaping.svg"
            alt={dict.shaping?.imageAlt || "Shaping - WellFit"}
            width={600}
            height={400}
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1 text-gray-800 w-full" data-aos="fade-right">
          {/* Logo Section */}
          <div className="mb-8" data-aos="fade-up">
            <Image
              src="/logo.png"
              alt={dict.shaping?.logoAlt || "WellFit Logo"}
              width={100}
              height={100}
              className="rounded-full object-contain mx-auto lg:mx-0"
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center lg:text-left" data-aos="fade-up">
            {dict.shaping?.title || "Shaping the Future Together"}
          </h2>

          {/* Paragraphs */}
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-4" data-aos="fade-up">
            <strong>{dict.shaping?.wellfit || "WellFit"}</strong> {dict.shaping?.intro || "is not just an investment – it’s your personal contribution to making the world healthier, more connected, and more innovative. With our vision, we aim to uniquely combine health, education, and technology, making them accessible everywhere: in museums, zoos, nature, or directly in your home. Together, we are building a platform that sustainably inspires people worldwide and actively drives change."}
          </p>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-4" data-aos="fade-up">
            {dict.shaping?.together || "Together, we are creating a platform that sustainably inspires people worldwide and actively drives change."}
          </p>

          {/* Key Investment Benefits */}
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-4" data-aos="fade-up">
            <strong>{dict.shaping?.support || "Your support becomes a valuable legacy."}</strong> {dict.shaping?.investment || "With an investment starting at"} <strong>€2,500,</strong> {dict.shaping?.partOf || "you become part of something truly unique and receive a strictly limited physical"} <strong>{dict.shaping?.token || "WellFit token"}</strong>. {dict.shaping?.complementedBy || "This is complemented by a digital NFT that grants you exclusive rights and benefits."}
          </p>

          {/* Benefits Section */}
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-4" data-aos="fade-up">
            <strong>{dict.shaping?.votingRights || "Voting Rights:"}</strong> <br />
            {dict.shaping?.votingDesc || "Influence the development of our platform with exclusive voting privileges."}
            <br />
            <strong>{dict.shaping?.priorityAccess || "Priority Access:"}</strong> {dict.shaping?.priorityDesc || "Gain early access to the beta phase and enjoy exclusive features reserved for a select group of supporters."}
          </p>

          {/* Physical Token as a Symbol */}
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed" data-aos="fade-up">
            <strong>{dict.shaping?.symbol || "A symbol of Contribution:"}</strong>
            <br />
            {dict.shaping?.symbolDesc || "Your Physical WellFit token serves as a collectable and a testament to your involvement in a global movement."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Shaping;
