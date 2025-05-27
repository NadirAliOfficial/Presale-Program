"use client";
import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname to get the current path
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // AOS CSS

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Navbar: React.FC<{ dict: any, lang: 'en-US' | 'de-ES' }> = ({ dict, lang }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(lang);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // To handle dropdown visibility
  const router = useRouter();
  const pathname = usePathname(); // Get the current path for link management

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false); // This will close the mobile menu
  };

  const changeLanguage = (newLang: 'en-US' | 'de-ES') => {
    setSelectedLang(newLang);
    let newPath = pathname;

    // Check for existing language in the URL and replace it with the new language
    if (pathname.startsWith('/en-US')) {
      newPath = pathname.replace('/en-US', `/${newLang}`);
    } else if (pathname.startsWith('/de-ES')) {
      newPath = pathname.replace('/de-ES', `/${newLang}`);
    } else {
      // If there is no language in the path, prepend the selected language
      newPath = `/${newLang}${pathname}`;
    }

    router.push(newPath); // Redirect to the new language path
  };

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Animation duration
      easing: 'ease-out', // Easing function
      once: true, // Animation happens only once
    });
  }, []);


  const presaleLink = `/${selectedLang}/Presale`;
  
  const whitepaperFileLink = `/${selectedLang}/Whitepaper`;

  return (
    <header className="bg-black text-white shadow-lg fixed w-full top-0 left-0 z-20">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div data-aos="fade-down" data-aos-delay="100">
          <Image
            src="/logo.png"
            alt="Logo"
            width={48}
            height={48}
            className="h-12 w-auto mr-4"
          />
        </div>

        {/* Hamburger Icon (for mobile) */}
        <button
          className="md:hidden text-green-400 focus:outline-none"
          onClick={toggleMobileMenu}
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <nav
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } md:flex space-x-6 md:space-x-6 md:items-center absolute md:static bg-black w-full md:w-auto top-16 left-0 md:top-0 z-10 p-4 md:p-0`}
        >
          <Link
            href="#Hero"
            className="block md:inline hover:text-green-400"
            data-aos="fade-up"
            data-aos-delay="300"
            onClick={closeMobileMenu} // Close mobile menu when a link is clicked
          >
            {dict.nav?.home || "HOME"}
          </Link>
          <Link
            href="#Insight"
            className="block md:inline hover:text-green-400"
            data-aos="fade-up"
            data-aos-delay="400"
            onClick={closeMobileMenu} // Close mobile menu when a link is clicked
          >
            {dict.nav?.technology || "TECHNOLOGY"}
          </Link>
          <Link
            href="#Revolution"
            className="block md:inline hover:text-green-400"
            data-aos="fade-up"
            data-aos-delay="500"
            onClick={closeMobileMenu} // Close mobile menu when a link is clicked
          >
            {dict.nav?.revolution || "REVOLUTION"}
          </Link>
          <Link
            href="#Adddoing"
            className="block md:inline hover:text-green-400"
            data-aos="fade-up"
            data-aos-delay="600"
            onClick={closeMobileMenu} // Close mobile menu when a link is clicked
          >
            {dict.nav?.addingDoing || "ADDING DOING"}
          </Link>
          <Link
            href="#Contribution"
            className="block md:inline hover:text-green-400"
            data-aos="fade-up"
            data-aos-delay="700"
            onClick={closeMobileMenu} // Close mobile menu when a link is clicked
          >
            {dict.nav?.investment || "INVESTMENT"}
          </Link>
          {/* Dynamic Whitepaper Link */}
          <Link
            href={whitepaperFileLink}
            rel="noopener noreferrer"
            className="block md:inline hover:text-green-400"
            data-aos="fade-up"
            data-aos-delay="800"
            onClick={closeMobileMenu} // Close mobile menu when a link is clicked
          >
            {dict.nav?.whitepaper || "WHITEPAPER"}
          </Link>

          {/* Mobile View - Language Selector & Buy Now Button */}
          <div className="mt-4 flex flex-col space-y-4 md:hidden">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 text-white hover:text-green-400"
                data-aos="fade-up"
                data-aos-delay="900"
              >
                <span>{selectedLang === 'en-US' ? 'English' : 'Deutsch'}</span>
                <FaChevronDown />
              </button>
              {isDropdownOpen && (
                <div className="absolute bg-black text-white shadow-lg p-2 rounded mt-2 w-full z-20">
                  <button
                    onClick={() => { changeLanguage('en-US'); closeMobileMenu(); }} // Close mobile menu when language is changed
                    className="block w-full text-left px-4 py-2 hover:bg-green-400"
                  >
                    English
                  </button>
                  <button
                    onClick={() => { changeLanguage('de-ES'); closeMobileMenu(); }} // Close mobile menu when language is changed
                    className="block w-full text-left px-4 py-2 hover:bg-green-400"
                  >
                    Deutsch
                  </button>
                </div>
              )}
            </div>

            {/* "Buy Now" Button with dynamic language link */}
            <Link
              href={presaleLink}
              className="bg-green-400 px-4 py-2 rounded-full hover:bg-green-500 text-black font-semibold"
              data-aos="fade-up"
              data-aos-delay="1000"
              onClick={closeMobileMenu} // Close mobile menu when link is clicked
            >
              {dict.nav?.buyNow || "Buy Now"}
            </Link>
          </div>
        </nav>

        {/* Desktop View - Language Selector & Buy Now Button */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 text-white hover:text-green-400"
              data-aos="fade-down"
              data-aos-delay="1100"
            >
              <span>{selectedLang === 'en-US' ? 'English' : 'Deutsch'}</span>
              <FaChevronDown />
            </button>
            {isDropdownOpen && (
              <div className="absolute bg-black text-white shadow-lg p-2 rounded mt-2 w-32 z-20">
                <button
                  onClick={() => { changeLanguage('en-US'); closeMobileMenu(); }} // Close mobile menu when language is changed
                  className="block w-full text-left px-4 py-2 hover:bg-green-400"
                >
                  English
                </button>
                <button
                  onClick={() => { changeLanguage('de-ES'); closeMobileMenu(); }} // Close mobile menu when language is changed
                  className="block w-full text-left px-4 py-2 hover:bg-green-400"
                >
                  Deutsch
                </button>
              </div>
            )}
          </div>

          {/* "Buy Now" Button with dynamic language link */}
          <Link
            href={presaleLink}
            className="bg-green-400 px-4 py-2 rounded-full hover:bg-green-500 text-black font-semibold"
            data-aos="fade-down"
            data-aos-delay="1200"
            onClick={closeMobileMenu} // Close mobile menu when link is clicked
          >
            {dict.nav?.buyNow || "Buy Now"}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
