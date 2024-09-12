"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Attraction, useAuth } from '../context/UserContext';
import Link from 'next/link';
import Avatar from '../components/Avatar';

export default function Attractions() {
  const [areas, setAreas] = useState<string[]>([]);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
   const [filteredAttractions, setFilteredAttractions] = useState<Attraction[]>([]);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user, setUser, fetchUser } = useAuth();

  console.log("user in attractions", user);
  console.log("filtered  attractions", filteredAttractions);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/attractions/all_attractions`).then(res => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/attractions/areas`).then(res => res.json())    ])
    .then(([attractionsData, areasData]) => {
      setAttractions(attractionsData.data);
      setFilteredAttractions(attractionsData.data);
      setAreas(areasData.data);
    })
    .catch(err => setError(err.message));
  }, []);

  const handleFilterByArea = (area: string | null) => {
    setSelectedArea(area);
    if (area) {
      setFilteredAttractions(attractions.filter(attraction => attraction.area === area));
    } else {
      setFilteredAttractions(attractions);
    }
  };
 
  const handleWantToGo = (attraction: Attraction) => {
    if (!user?.token) return;
  
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/user/${user.user.username}/update_want_to_go/${attraction.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        setUser((prevUser) => {
          if (!prevUser) return prevUser;
  
          const isInWantToGo = prevUser.user.attractions_want.some((a) => a.id === attraction.id);
  
          const updatedAttraction = {
            id: attraction.id,
            name: attraction.name,
            area: attraction.area,
            image: attraction.image,
            want_to_go: !isInWantToGo,
            gone: false,
            rating: 0,
          };
  
          const updatedAttractionsWant = isInWantToGo
            ? prevUser.user.attractions_want.filter((a) => a.id !== attraction.id)
            : [...prevUser.user.attractions_want, updatedAttraction];
  
          return {
            ...prevUser,
            user: {
              ...prevUser.user,
              attractions_want: updatedAttractionsWant,
            },
          };
        });
      })
      .catch((err) => setError(err.message));
  };
  
  
  
  

  return (
    <div >
        <header className="h-14 p-2 flex items-center justify-between gap-4 bg-[#323393] text-white">
        <div>
        
        <Link href={"/dashboard"} className="p-2 bg-gradient-to-br  text-white from-green-900 to-green-500 rounded-lg"> Home</Link>

        </div>
      <div className='flex items-center justify-center gap-4'>

      <Link href={"/attractions/list"} className="px-2 py-1 bg-gradient-to-br  text-white from-yellow-900 to-yellow-500 rounded-lg"> Your Lists</Link>
    
    <Link href={"/profile"}>        <Avatar size="small" imageSrc={user?.user.image || '/black.png'} />
    </Link>
      </div>
   

  </header>

<div className='mt-6'>

      <h1 className="text-4xl font-bold text-green-800 text-center ">Select  Attractions</h1>
      {error && <p className="text-red-600 text-center">{error}</p>}
      
      {user && user.user ? (
        <>
          <div className="flex px-8 py-4 flex-col gap-4 justify-center ">
            <div className='flex  justify-between  items-start text-lg font-semibold'>
              <p>Total: {attractions.length}</p>
              <p>Want to go: {user?.user?.attractions_want?.length || 0} / {attractions.length}</p>
            </div>
            <div className='flex flex-col gap-2'>
            
            <div className=" grid grid-cols-2 gap-2 justify-center">
            <button
                className={`px-4 py-2 rounded-lg font-semibold ${!selectedArea ? 'bg-yellow-500' : 'bg-yellow-200'}`}
                onClick={() => handleFilterByArea(null)}
              >
                All Areas
              </button>
              {areas.map((area) => (
                <button
                  key={area}
                  className={`px-4 py-2 rounded-lg font-semibold ${selectedArea === area ? 'bg-yellow-500' : 'bg-yellow-200'}`}
                  onClick={() => handleFilterByArea(area)}
                >
                  {area}
                </button>
              ))}
            </div>
            </div>
            
            {filteredAttractions.map((attraction) => (
              <div key={attraction.id} className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-80 flex flex-col gap-4  ">
                <div className="flex justify-between items-center ">
                  <h2 className="text-2xl font-bold text-red-800">{attraction.name}</h2>
                  <h3 className="text-xl font-semibold text-green-600">{attraction.area}</h3>
                </div>
                {attraction.image ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${attraction.image}`}
                    width={280}
                    height={280}
                    alt={attraction.name}
                    className={`rounded-lg place-self-center ${
                      user.user.attractions_want.find((userAttraction) => userAttraction.id === attraction.id)
                        ? ''
                        : 'grayscale'
                    }`}
                  />
                ) : (
                  <p>No valid image available</p>
                )}
                <div className="flex gap-4">
                <button
  className={`text-white px-4 py-2 rounded-lg font-semibold w-full ${
    user.user.attractions_want.find((userAttraction) => userAttraction.id === attraction.id)
      ? 'bg-green-600'
      : 'bg-gray-500'
  }`}
  onClick={() => handleWantToGo(attraction)}
>
  {user?.user?.attractions_want?.find((a) => a.id === attraction.id) ? 'Added to Want to Go' : 'Add'}
</button>
                
                </div>
  
                
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>

  );
  
}
