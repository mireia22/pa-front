"use client";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Avatar from "../components/Avatar";
import Link from "next/link";

const avatarList = [
  { name: "woody", src: "/woodyavatar.png" },
  { name: "Eloi", src: "/eloi.png" },
  { name: "Dumbo", src: "/dumbo.png" },
  { name: "Tarzan", src: "/tarzan.png" },
  { name: "Cookie Monster", src: "/cookiemonster.png" },
  { name: "Sergi", src: "/ser.png" },
  { name: "Winnie", src: "/winnie.png" },
  { name: "Shrek", src: "/shrek.png" },
  { name: "Jack", src: "/toystory.png" },
  { name: "Mireia", src: "/mire.png" },
  { name: "Boo", src: "/boo.png" },
  { name: "Nemo", src: "/nemo.png" },
];

export default function ProfilePage() {
  const { user, logout, setUser } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(user?.user.image || '/black.png');

 
  console.log("userid", user)
  const updateAvatar = async (imageSrc: string) => {
    if (!user) return;
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/user/${user.user.id}/avatar`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ image: imageSrc }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update avatar");
      }
  
      const updatedUser = await response.json();
      setUser((prev) => {
        if (!prev) return prev; 
      
        return {
          ...prev,
          user: {
            ...prev.user,
            image: updatedUser.image, 
          },
          token: prev.token, 
        };
      });
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };
  

  const handleAvatarClick = async (src: string) => {
    setSelectedAvatar(src);
    if (user) {
      await updateAvatar(src);
    }
  };

  return (
    <>
      <header className="h-14 p-2 flex items-center justify-between gap-2 bg-[#323393] text-white">
        <div>
        
        <Link href={"/dashboard"} className="p-2 bg-gradient-to-br  text-white from-green-900 to-green-500 rounded-lg"> Home</Link>

        </div>
      <div className='flex items-center justify-center gap-2'>
      <Link href={"/attractions"} className="px-2 py-1 bg-gradient-to-br  text-white from-blue-800 to-blue-400 rounded-lg"> Select Attractions</Link>

      <Link href={"/attractions/list"} className="px-2 py-1 bg-gradient-to-br  text-white from-yellow-900 to-yellow-500 rounded-lg"> Your Lists</Link>
    
    <Link href={"/profile"}>        <Avatar size="small" imageSrc={user?.user.image || '/black.png'} />
    </Link>
      </div>
   

  </header>
      <main className="flex flex-col items-center justify-center py-6 px-2 gap-4">

        {user ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex flex-col items-center justify-center">

            <Avatar imageSrc={user?.user.image || '/black.png'} />
            <p className="text-red-900 text-4xl font-extrabold">{user.user.username}</p>
            </div>
        
            <p>
              Tu qui ets?
            </p>
            <ul className="grid grid-cols-3 gap-1">
              {avatarList.map((avatar) => (
                <li
                  key={avatar.name}
                  onClick={() => handleAvatarClick(avatar.src)}
                  className={`cursor-pointer ${selectedAvatar === avatar.src ? " scale-125 transform rotate-180 " : ""}`}
                >
                  <Avatar size="medium" imageSrc={avatar.src} />
                </li>
              ))}
            </ul>
            <button onClick={logout} className="px-2 py-1 mt-4 bg-gradient-to-br  text-white from-red-900 to-red-500 rounded-lg">
          Logout
        </button>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
       
      </main>
     
    </>
  );
}
