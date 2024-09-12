import Image from 'next/image';
import React from 'react';

interface AvatarProps {
  imageSrc: string;
  username?: string;
  size?: 'small' | 'medium' | 'large';
}

const Avatar: React.FC<AvatarProps> = ({ imageSrc, size = 'large' }) => {
  const sizeClasses = {
    small: 'w-12 h-12', 
    medium: 'w-16 h-16', 
    large: 'w-[150px] h-[150px]',
  };

  return (
    <div className={`rounded-full relative overflow-hidden flex justify-center items-center ${sizeClasses[size]} border-[3px] bg-white border-blue-950`}>
      <Image
        src={imageSrc}
        alt="avatar"
        layout="fill"
        objectFit="cover"
        className="rounded-full"
      />
    </div>
  );
};

export default Avatar;
