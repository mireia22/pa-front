import Link from "next/link";
import Countdown from "../components/Countdown";
import PAShadow from "../components/PAShadow";

export default function CountdownPage() {
  return (
    <main className="flex flex-col items-center p-6  justify-between bg-black min-h-full  ">
        <section className="mt-10">
        <h1 className="text-white">Queden</h1>

<Countdown />
        </section>
        <PAShadow />


<div className="flex justify-between w-full mb-2">
<Link href={"/"} className="px-2 py-1 bg-gradient-to-br self-end text-white from-green-900 to-green-500 rounded-lg ">Return</Link>

<Link href={"/register"} className="px-2 py-1 bg-gradient-to-br self-end text-white from-blue-900 to-blue-500 rounded-lg ">Next</Link>

</div>




    </main>
  );
}
