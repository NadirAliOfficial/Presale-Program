"use client"; // Ensure this is a Client Component

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar"; // Direct import
import Hero from "@/components/Hero"; // Direct import
import Insight from "@/components/Insight"; // Direct import
import Revolution from "@/components/Revolution"; // Direct import
import Adddoing from "@/components/Adddoing"; // Direct import
import Contribution from "@/components/Contribution"; // Direct import
import Shaping from "@/components/Shaping"; // Direct import
import Joinpresale from "@/components/Joinpresale"; // Direct import
import Footer from "@/components/Footer"; // Direct import
import { getDictionary } from "./dictionaries"; // Assuming you have a method to fetch the dictionary
import AOS from "aos";
import "aos/dist/aos.css"; // AOS CSS

export default function Page({
  params,
}: {
  params: Promise<{ lang: "en-US" | "de-ES" | "de" }>;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dict, setDict] = useState<any>(null);
  const [lang, setLang] = useState<"en-US" | "de-ES" | "de">("en-US");

  // Fetch params after they resolve (unwrap the Promise)
  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params; // Unwrap the Promise to get lang
      setLang(resolvedParams.lang === "de" ? "de-ES" : resolvedParams.lang);
    };
    fetchParams();
  }, [params]);

  // Fetch the dictionary based on the language
  useEffect(() => {
    const fetchDictionary = async () => {
      try {
        const normalizedLang: "en-US" | "de-ES" | "de" =
          lang === "de" ? "de-ES" : (["en-US", "de-ES"].includes(lang) ? lang : "en-US");
        const dictionary = await getDictionary(normalizedLang);
        setDict(dictionary);
      } catch (error) {
        console.error("Failed to fetch dictionary:", error);
      }
    };

    if (lang) {
      fetchDictionary();
    }

    AOS.init({
      duration: 1000,
      easing: "ease-out",
      once: true,
    });
  }, [lang]);

  
  return (
    <div>
      {dict && (
        <>
          <Navbar lang={lang === "de" ? "de-ES" : lang} dict={dict} />
          <Hero dict={dict} />
          <Insight dict={dict} />
          <Revolution dict={dict} />
          <Adddoing dict={dict} />
          <Contribution dict={dict} />
          <Shaping dict={dict} />
          <Joinpresale dict={dict} />
          <Footer dict={dict} />
        </>
      )}
    </div>
  );
}