

import Image from 'next/image';
import React from 'react';


const PAShadow: React.FC = () => {
    const shadowSrc = '/shadow.png'; 

  return (
  
    <section className="w-screen">
    <Image
                src={shadowSrc}
                alt="Port Aventura"
                height={350}
                width={350}
                className="mt-4 w-full brightness-200  saturate-0"
              />
    </section>
  );
};

export default PAShadow;
