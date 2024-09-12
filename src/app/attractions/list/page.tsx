"use client"
import AttractionImage from "@/app/components/AttractionImage";
import Avatar from "@/app/components/Avatar";
import { Attraction, useAuth } from "@/app/context/UserContext";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ResumeList() {
    const [attractions, setAttractions] = useState<Attraction[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'wantToGo' | 'gone'>('wantToGo');
    
    const { user, setUser} = useAuth();

    console.log("user in list", user)
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/attractions/all_attractions`);
                if (!response.ok) {
                    throw new Error('Failed to fetch attractions');
                }
                const data = await response.json();
                setAttractions(data.data);
            } catch (err) {
                setError((err as Error).message);
            }
        };

        loadData();
    }, []);

    const attractionsWantCount = user?.user.attractions_want?.length ?? 0;
    const attractionsGoneCount = user?.user.attractions_gone?.length ?? 0;
    const totalAttractions = attractions.length;

    const isGone = (id: string) => user?.user.attractions_gone.some(attraction => attraction.id === id);

    const handleRating = (id: string, rating: number) => {
        if (!user?.token) return;
    
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/user/${user.user.username}/update_rating/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({ rating }),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to update the rating');
            }
            return res.json();
        })
        .then(() => {
            setAttractions((prevAttractions) =>
                prevAttractions.map((attraction) =>
                    attraction.id === id ? { ...attraction, rating } : attraction
                )
            );
    
            setUser((prevUser) => {
                if (!prevUser) return prevUser;
    
                return {
                    ...prevUser,
                    user: {
                        ...prevUser.user,
                        attractions_gone: prevUser.user.attractions_gone.map((attraction) =>
                            attraction.id === id ? { ...attraction, rating } : attraction
                        ),
                    },
                };
            });
        })
        .catch((err) => setError(err.message));
    };
    

    const handleTimesChange = (id: string, increment: boolean) => {
        if (!user?.token) return;
    
        const newTimes = increment
            ? (user.user.attractions_gone.find(a => a.id === id)?.times || 1) + 1
            : (user.user.attractions_gone.find(a => a.id === id)?.times || 1) - 1;
    
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/user/${user.user.username}/update_times/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({ times: newTimes }),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to update the times');
            }
            return res.json();
        })
        .then(() => {
            setAttractions((prevAttractions) =>
                prevAttractions.map((attraction) =>
                    attraction.id === id ? { ...attraction, times: newTimes } : attraction
                )
            );
    
            setUser((prevUser) => {
                if (!prevUser) return prevUser;
    
                return {
                    ...prevUser,
                    user: {
                        ...prevUser.user,
                        attractions_gone: prevUser.user.attractions_gone.map((attraction) =>
                            attraction.id === id ? { ...attraction, times: newTimes } : attraction
                        ),
                    },
                };
            });
        })
        .catch((err) => setError(err.message));
    };
    

    const handleGone = (attraction: Attraction) => {
        if (!user?.token) return;
    
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/user/${user.user.username}/update_gone/${attraction.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
        })
        .then((res) => res.json())
        .then(() => {
            setAttractions((prevAttractions) =>
                prevAttractions.map((a) =>
                    a.id === attraction.id ? { ...a } : a
                )
            );
    
            setUser((prevUser) => {
                if (!prevUser) return prevUser; 
    
                const isInGone = prevUser.user.attractions_gone?.some((a) => a.id === attraction.id);
    
                const updatedAttractionsGone = isInGone
                    ? prevUser.user.attractions_gone?.filter((a) => a.id !== attraction.id)
                    : [...(prevUser.user.attractions_gone || []), attraction];
    
                return {
                    ...prevUser,
                    user: {
                        ...prevUser.user,
                        attractions_gone: updatedAttractionsGone,
                    },
                };
            });
        })
        .catch((err) => setError(err.message));
    };
    
      
    
    return (
        <div className=' flex flex-col gap-4'>
            
            <header className="h-14 p-2 flex items-center justify-between gap-4 bg-[#323393] text-white">
        <div>
        
        <Link href={"/dashboard"} className="p-2 bg-gradient-to-br  text-white from-green-900 to-green-500 rounded-lg"> Home</Link>

        </div>
      <div className='flex items-center justify-center gap-4'>

      <Link href={"/attractions"} className="px-2 py-1 bg-gradient-to-br  text-white from-yellow-900 to-yellow-500 rounded-lg"> Select Attractions</Link>
    
    <Link href={"/profile"}>        <Avatar size="small" imageSrc={user?.user.image || '/black.png'} />
    </Link>
      </div>
   

  </header>
            <div className='p-6'>
            {/* Tab buttons */}
            <div className="mb-4">
                <button 
                    className={`p-2 border-b-4 border-red-500 ${activeTab === 'wantToGo' ? 'bg-red-200 font-extrabold ' : 'bg-red-100'}`} 
                    onClick={() => setActiveTab('wantToGo')}
                >
                    Want to Go: {attractionsWantCount} / {totalAttractions}
                </button>
                <button 
                    className={`p-2 border-b-4 border-green-500 ml-4 ${activeTab === 'gone' ? 'bg-green-200 font-extrabold ' : 'bg-green-100'}`} 
                    onClick={() => setActiveTab('gone')}
                >
                    Gone: {attractionsGoneCount} / {attractionsWantCount}
                </button>
            </div>

          {/* Render content based on the active tab */}
{activeTab === 'wantToGo' && (
    <div>
        <table className="min-w-full divide-y divide-gray-200 justify-between ">
            <thead>
                <tr>
                    <th className="p-2 bg-gray-50 text-start">Area</th>
                    <th className="p-2 bg-gray-50 text-start">Name</th>
                    <th className="p-2 bg-gray-50">Status</th>
                </tr>
            </thead>
            <tbody>
                {user?.user.attractions_want && user?.user.attractions_want.length > 0 ? (
                    user?.user.attractions_want.map((attraction) => (
                        <tr key={attraction.id} className="bg-white divide-y divide-gray-200 ">
                            <td className="p-2 py-4 whitespace-nowrap text-start">{attraction.area}</td>
                            <td className="p-2 py-4 whitespace-nowrap text-start">{attraction.name}</td>
                            <td 
                                className="p-2 py-4 whitespace-nowrap text-center cursor-pointer" 
                                onClick={() => handleGone(attraction)}
                            >
                                {isGone(attraction.id) ? (
                                    <span className="text-green-600 text-center">✓</span>
                                ) : (
                                    <span className="text-red-600 text-center">✗</span>
                                )}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr className="bg-white divide-y divide-gray-200">
                        <td colSpan={3} className="px-6 py-4 text-center">
                            <div className="flex flex-col mt-6 gap-4 justify-between items-center self-center">
                                <p>No attractions added.</p>
                                <Link href={"/attractions"} className="p-2 bg-gradient-to-br text-white from-green-900 to-green-500 rounded-lg">
                                    Add Attractions
                                </Link>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
)}


            {activeTab === 'gone' && (
                <div>
                    <table className="min-w-full divide-y divide-gray-200 text-start">
                        <thead>
                            <tr>
                                <th className="p-2 bg-gray-50 text-start">Name</th>
                                <th className="p-2  bg-gray-50 text-center">Times</th>
                                <th className="p-2  bg-gray-50 text-center">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user?.user.attractions_want && user?.user.attractions_gone.length > 0 ? (
                                user?.user.attractions_gone.map((attraction) => (
                                    <tr key={attraction.id} className="bg-white divide-y divide-gray-200  ">
                                        <td className="p-2 py-4 whitespace-nowrap text-start ">
                                        {attraction.name}
                                       <AttractionImage attraction={attraction}/>
                                            </td>
                                        

                                        <td className="p-2 py-4 whitespace-nowrap text-center">
                                            <button 
                                                onClick={() => handleTimesChange(attraction.id, false)} 
                                                className="p-1 border border-gray-300 rounded-lg"
                                                disabled={(attraction.times || 0) <= 0}
                                            >
                                                -
                                            </button>
                                            <span className="mx-2">{attraction.times}</span>
                                            <button 
                                                onClick={() => handleTimesChange(attraction.id, true)} 
                                                className="p-1 border border-gray-300 rounded-lg"
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td className="p-2 py-4 whitespace-nowrap text-center mt-4 ">
    <label className="block text-gray-700 mb-2">
        <select
            value={attraction.rating || ''}
            onChange={(e) => handleRating(attraction.id, parseInt(e.target.value))}
            className="p-1 border border-gray-300 rounded-lg text-yellow-700 font-extrabold"
        >
            <option value="">★</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num} >
                    <span style={{ color: 'yellow' }}>{num} ★</span>
                </option>
            ))}
        </select>
    </label>
</td>

                                    </tr>
                                ))
                            ) : (
                                <tr className="bg-white divide-y divide-gray-200">
                                    <td colSpan={3} className="p-2 py-4 text-center">No attractions marked as gone.</td>

                                </tr>
                            )}
                        </tbody>
                    </table>
                    {error && (
   <div className="p-2 text-red-600 bg-red-100 rounded-lg">
      {error}
   </div>
)}
                </div>
            )}
        </div>
        </div>
    );
}
