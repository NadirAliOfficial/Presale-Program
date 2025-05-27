/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS CSS

const Contribution = ({ dict }: { dict: any }) => {
  useEffect(() => {
    // Initialize AOS when the component mounts
    AOS.init({
      duration: 1000, // Animation duration
      easing: 'ease-out', // Easing function
      once: false, // Allow animation to happen each time the element comes into view
    });
  }, []); // Empty array means it runs once when the component mounts

  return (
    <section
      id="Contribution"
      className="bg-white px-6 py-12 sm:px-12 lg:px-20 lg:py-20 flex flex-col items-center gap-8"
    >
      {/* Content Section */}
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Text Section */}
        <div
          className="flex-1 text-gray-800"
          data-aos="fade-up" // AOS animation for fade-up effect
        >
          <div className="mb-8">
            <Image
              src="/logo.png"
              alt="WellFit Logo"
              width={100}
              height={100}
              className="rounded-full object-contain"
            />
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            data-aos="fade-up"
            data-aos-delay="200" // Slight delay for smooth animation
          >
            {dict.contribution?.title || 'Your contribution to a better future'}
          </h2>
          <p
            className="text-lg sm:text-xl leading-relaxed mb-4"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {dict.contribution?.text1 ||
              'By participating in the first phase of our pre-sale, you are laying a cornerstone for the future of WellFit – and beyond. Your investment is more than just financial support: it secures the patent for our groundbreaking technology and empowers us to turn the vision of WellFit into reality.'}
          </p>
          <p
            className="text-lg sm:text-xl leading-relaxed mb-4"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            {dict.contribution?.text2 ||
              'Through the acquisition of WellFit Tokens, you become part of a movement that redefines the boundaries of health, education, and technology. You help us protect innovation, enhance quality of life, and create a platform that inspires people worldwide.'}
          </p>
          <p
            className="text-lg sm:text-xl leading-relaxed mb-4 font-semibold"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            {dict.contribution?.text3 || 'Your contribution makes a difference.'}
          </p>
          <p
            className="text-lg sm:text-xl leading-relaxed mb-4"
            data-aos="fade-up"
            data-aos-delay="1000"
          >
            {dict.contribution?.text4 ||
              'You won’t just witness a revolution in health and technology – you’ll actively shape it. Together, we’re building a world where wellness and knowledge go hand in hand. Join us as WellFit moves the world forward.'}
          </p>
          <p
            className="text-lg sm:text-xl leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="1200"
          >
            <strong>{dict.contribution?.text5 || 'Your engagement matters.'}</strong>
            {dict.contribution?.text6 || ' Your decision propels us all toward a brighter future.'}
          </p>
        </div>

        {/* Image Section */}
        <div
          className="flex-1"
          data-aos="fade-left" // Apply fade-left animation to image
          data-aos-delay="400" // Delay animation to sync with text
        >
          <Image
            src="/Contribution.svg"
            alt="A Better Future - WellFit"
            width={600}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Contribution;
