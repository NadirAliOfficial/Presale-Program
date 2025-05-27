/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from 'react';
import Presale from './Presale'; 
import { getDictionary } from './../dictionaries';  

const Page = ({ params }: { params: Promise<{ lang: 'en-US' | 'de-ES' | 'de' }> }) => {
  const [dict, setDict] = useState<any>(null);
 

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params; 
      const langFromParams = resolvedParams.lang === "de" ? "de-ES" : resolvedParams.lang;
     
      const dictionary = await getDictionary(langFromParams);
      setDict(dictionary);
    };

    fetchParams();
  }, [params]); 

  return (
    <div className='pt-5 pb-10 bg-gray-100'>
      {dict && <Presale dict={dict} />}
    </div>
  );
};

export default Page;
