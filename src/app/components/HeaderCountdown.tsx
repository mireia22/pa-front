"use client";
import React, { useEffect, useState } from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

const HeaderCountdown: React.FC = () => {
  const portaventuraDate = new Date('2024-09-16T10:00:00');

  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      if (portaventuraDate > now) {
        setDays(differenceInDays(portaventuraDate, now));
        setHours(differenceInHours(portaventuraDate, now) % 24);
        setMinutes(differenceInMinutes(portaventuraDate, now) % 60);
        setSeconds(differenceInSeconds(portaventuraDate, now) % 60);
      } else {
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    };

    calculateTimeLeft(); 
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [portaventuraDate]);

  return (
    <div className='flex flex-col h-10 w-44 items-center justify-center  p-1 bg-gradient-to-b  to-[#ef320c]  from-[#ff6d2e] rounded-lg '>
           <div className='flex  text-center items-end'>

     <div className='flex flex-col items-center'>
          
        </div>
        </div>
      <div className='flex gap-1  text-white text-center items-end'>
        
      <div className='text-xs font-extrabold bg-black bg-opacity-40 py-2 px-1 rounded-md w-10'>
            {days} d
          </div>
          <div className='text-xs font-extrabold bg-black bg-opacity-40 p-2 rounded-md w-10'>
          {hours} h
             </div>
          <div className='text-xs font-extrabold bg-black bg-opacity-40 p-2 rounded-md w-10'>
          {minutes} m
                 </div>
          <div className='text-xs font-extrabold bg-black bg-opacity-40 p-2 rounded-md w-10'>
          {seconds} s
        </div>
      </div>
    </div>
  );
};

export default HeaderCountdown;
