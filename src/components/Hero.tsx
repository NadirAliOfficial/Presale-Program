import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HeroSection = ({ dict }: { dict: any }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out",
      once: true,
    });
  }, []); 

  return (
    <section
      id="Hero"
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/Hero.svg')",
      }}
    >

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 sm:px-8 md:px-12">
        <h1
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4"
          data-aos="fade-up" // AOS fade-up effect
          data-aos-delay="200" // Optional delay to stagger animations
        >
          {dict.hero?.title || "Discover the future of technology, health, and education"}
        </h1>
        <p
          className="text-base sm:text-lg md:text-xl font-medium mb-6"
          data-aos="fade-up" // AOS fade-up effect
          data-aos-delay="400" // Optional delay to stagger animations
        >
          {dict.hero?.description || "A revolutionary platform that rewards you while boosting your health and knowledge"}
        </p>
        <button
          className="bg-green-500 hover:bg-green-600 text-white text-base sm:text-lg px-6 py-3 rounded-full font-bold transition"
          data-aos="fade-up" // AOS fade-up effect
          data-aos-delay="600"
        >
          {dict.hero?.button || "Los Geht&apos;s"}
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
