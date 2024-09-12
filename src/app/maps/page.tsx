"use client";
import Avatar from "../components/Avatar";
import Link from "next/link";
import { useAuth } from "../context/UserContext";
import Image from "next/image";
import { useState } from "react";
import HeaderCountdown from "../components/HeaderCountdown";

export default function Maps() {
  const { user } = useAuth();
  const [selectedMap, setSelectedMap] = useState("PortAventura Park");
  const [isFullScreen, setIsFullScreen] = useState(false);

  const mapsList = [
    { name: "🎢 PortAventura Park", src: "/portaventura-park.jpg" },
    { name: "🤠 Far West", src: "/far_west.png" },
    { name: "🍜 China", src: "/china.png" },
    { name: "🏝️ Polynesia", src: "/polynesia.png" },
    { name: "🏖️ Mediterrania", src: "/mediterrania.png" },
    { name: "🫔 Mexico", src: "/mexico.png" },
    { name: "🪅 Sesamo Aventura", src: "/sesamo_aventura.png" },
    { name: "🏎️ Ferrari Land", src: "/ferrari_land.png" },
  ];

  const handleMapSelect = (mapName: string) => {
    setSelectedMap(mapName);
    setIsFullScreen(false); 
  };

  const selectedMapData = mapsList.find((map) => map.name === selectedMap);

  const handleImageClick = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <>
      <header className="h-14 p-2 flex items-center justify-between gap-4 bg-[#323393] text-white">
    
      <Link href={"/dashboard"} className="p-2 bg-gradient-to-br  text-white from-green-900 to-green-500 rounded-lg"> Home</Link>

        <HeaderCountdown />
        <Link href={"/profile"}>
          <Avatar size="small" imageSrc={user?.user.image || '/black.png'} />
        </Link>
      </header>

      <main className="flex flex-col items-center justify-center gap-4 mt-14 p-4">
      <p className="text-4xl uppercase text-red-700 font-extrabold"> Park Maps</p>

              <Image
                src={mapsList[0].src}
                alt={mapsList[0].name}
                height={400}
                width={400}
                className="rounded-md"
                onClick={() => {
                    handleMapSelect(mapsList[0].name);
                    handleImageClick();
                  }}               />
        <div className="grid grid-cols-2 gap-3 self-auto">
       
          {mapsList.map((map) => (
            <button
              key={map.name}
              className={`px-4 py-2 rounded-lg font-semibold ${selectedMap === map.name ? 'bg-yellow-500' : 'bg-yellow-200'}`}
              onClick={() => {
                handleMapSelect(map.name);
                handleImageClick();
              }} 
            >
              {map.name}
            </button>
          ))}
        </div>

        {/* Fullscreen image overlay */}
        {isFullScreen && selectedMapData && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 cursor-pointer"
            onClick={handleImageClick}
          >
            <div className="relative w-full h-full">
              <Image
                src={selectedMapData.src}
                alt={selectedMapData.name}
                layout="fill" 
                objectFit="contain" 
                className="rotate-90" 
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
}
