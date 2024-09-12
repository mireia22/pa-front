import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center p-6  bg-black min-h-full justify-between  ">
      <h1 className="text-white ">Benvingut a la millor app de  </h1>

<section className="flex flex-col items-start ">
   <h1 className="text-[10rem]  leading-none font-black bg-gradient-to-t from-yellow-400 via-red-500 to-blue-700 bg-clip-text text-transparent">
        PORT
      </h1>
      <h1 className="text-[9rem] text-center leading-none break-all font-bold bg-gradient-to-b from-yellow-400 via-red-500 to-blue-700 bg-clip-text text-transparent">
        AVENTURA
      </h1>
     
</section>
      
      
  
  <Link href={"/countdown"} className=" mb-2 px-2 py-1 mt-2 bg-gradient-to-br self-end text-white from-blue-900 to-blue-500 rounded-lg ">Next</Link>




    </main>
  );
}
