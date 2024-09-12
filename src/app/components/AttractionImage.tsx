"use client"
import { useState } from 'react';
import Image from 'next/image';
import { Attraction } from '../context/UserContext';

const AttractionImage = ({ attraction }: {attraction: Attraction}) => {
  const [imageSrc, setImageSrc] = useState(`${process.env.NEXT_PUBLIC_API_URL}/static/${attraction.image}`);
  const fallbackSrc = `${process.env.NEXT_PUBLIC_API_URL}${attraction.image}`;

  const handleError = () => {
    setImageSrc(fallbackSrc);
  };

  return (
    <Image
      src={imageSrc}
      width={120}
      height={120}
      alt={attraction.name}
      className="rounded-lg place-self-center"
      onError={handleError}
    />
  );
};

export default AttractionImage;
