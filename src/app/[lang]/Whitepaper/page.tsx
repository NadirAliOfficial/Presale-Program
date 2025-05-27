/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from 'react';
import { getDictionary } from './../dictionaries';

const WhitepaperPage = ({ params }: { params: Promise<{ lang: 'en-US' | 'de-ES' | 'de' }> }) => {
  const [dict, setDict] = useState<any>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      const langFromParams = resolvedParams.lang === "de" ? "de-ES" : resolvedParams.lang;

      // Load the dictionary for the selected language
      const dictionary = await getDictionary(langFromParams);
      setDict(dictionary);
    };

    fetchParams();
  }, [params]);


  if (!dict) return null;  

  const lang = dict.lang || 'en-US';  // Default to 'en-US' if dict.lang is not set
  const whitepaperLink = `/${lang}/Whitepaper.pdf`;  // Correct link to the Whitepaper PDF

  return (
    <div className='pt-5 pb-10 bg-gray-100'>
      <iframe
        src={whitepaperLink}
        width="100%"
        height="800px"
        frameBorder="0"
        title="Whitepaper"
      />
    </div>
  );
};

export default WhitepaperPage;
