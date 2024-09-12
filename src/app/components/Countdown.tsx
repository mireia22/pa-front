"use client";
import React, { useEffect, useState } from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

const Countdown: React.FC = () => {
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
    <div className='flex flex-col h-80 w-72 items-center justify-center gap-10 p-2 bg-gradient-to-b  to-[#f05233]  from-[#ff9d00] rounded-lg '>
           <div className='flex  text-center items-end'>

     <div className='flex flex-col items-center'>
          <div className='text-9xl font-extrabold flex items-center justify-center bg-white  bg-opacity-40  rounded-md h-28 w-52 '>
          
<h1 className='bg-gradient-to-t  to-red-600 from-blue-700 bg-clip-text text-transparent'>
{days}
</h1>
           
           
          </div>
          <span className='text-2xl text-black font-black'>Dies</span>
        </div>
        </div>
      <div className='flex gap-2  text-white text-center items-end'>
        
        


        <div className='flex flex-col items-center '>
          <div className='text-5xl font-extrabold bg-black bg-opacity-40 p-2 rounded-md w-16'>
            {hours}
          </div>
          <span className='text-xl'>Hores</span>
        </div>
        <div className='flex flex-col items-center'>
          <div className='text-5xl font-extrabold bg-black bg-opacity-40 p-2 rounded-md w-16'>
            {minutes}
          </div>
          <span className='text-xl'>Minuts</span>
        </div>
        <div className='flex flex-col items-center'>
          <div className='text-5xl font-extrabold bg-black bg-opacity-40 p-2 rounded-md w-16'>
            {seconds}
          </div>
          <span className='text-xl'>Segons</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
