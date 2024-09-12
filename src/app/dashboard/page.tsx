import Avatar from "../components/Avatar";
import Link from "next/link";
import Woody from "../components/Woody";
import { useAuth } from "../context/UserContext";



export default function Dashboard() {
  const { user } = useAuth();

 

  return (
    <>
       <header className="h-14 p-2 flex items-center justify-end gap-4 bg-[#323393] text-white">
       

    
    <Link href={"/profile"}>        <Avatar size="small" imageSrc={user?.user.image || '/black.png'} />
    </Link>
   

  </header>
      <main className="flex flex-col items-center justify-center gap-16 p-4  ">
        <p className="text-4xl">Hello <span className="uppercase text-red-700 font-extrabold">{user?.user.username}  </span> </p>
        <div className="flex flex-col  gap-4 text-lg text-center">
        <Link href={"/profile"} className="p-2  bg-gradient-to-br  text-white from-blue-800 to-blue-500 rounded-lg ">Change Profile Photo</Link>
        <Link href={"/attractions"} className="p-2  bg-gradient-to-br  text-white from-green-800 to-green-500 rounded-lg ">Select Attractions You Want to Go</Link>
        <Link href={"/attractions/list"} className="p-2  bg-gradient-to-br  text-white from-yellow-800 to-yellow-500 rounded-lg ">See Your List of Attractions</Link>

        </div>


        <Woody/>

      </main>
     
    </>
  );
}
