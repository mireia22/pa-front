

import Image from 'next/image';
import React from 'react';


const Woody: React.FC = () => {
    const woodySrc = '/woody.png'; 

  return (
  
    <section >
    <Image
            src={woodySrc}
            alt="Port Aventura"
            height={170}
            width={170}
            className="mt-4 self-center"
          />
          </section>
  );
};

export default Woody;
