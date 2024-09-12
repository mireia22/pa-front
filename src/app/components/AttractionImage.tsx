"use client"
import { useState } from 'react';
import Image from 'next/image';
import { Attraction, useAuth } from '../context/UserContext';

const AttractionImage = ({ attraction, w, h }: { attraction: Attraction, w: number, h: number }) => {
  const [imageSrc, setImageSrc] = useState(`${process.env.NEXT_PUBLIC_API_URL}/static${attraction.image}`);
  const fallbackSrc = `${process.env.NEXT_PUBLIC_API_URL}${attraction.image}`;
const {user} = useAuth()
  const handleError = () => {
    setImageSrc(fallbackSrc);
  };

  return (
    <div style={{ width: w, height: h, position: 'relative' }}>
      <Image
        src={imageSrc}
        layout="fill"
        objectFit="cover" 
        alt={attraction.name}
        className={`rounded-lg place-self-center ${
            user?.user.attractions_want.find((userAttraction) => userAttraction.id === attraction.id)
              ? ''
              : 'grayscale'
          }`}        onError={handleError}
      />
    </div>
  );
};

export default AttractionImage;
