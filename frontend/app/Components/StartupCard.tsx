"use client";
import { useEffect, useState } from "react";

export const StartupCard = ({imgUrl}:{imgUrl:string}) => {
    console.log(imgUrl);
    
    const [isLogin,setIsLogin] = useState(false);
    useEffect(()=>{
        if (localStorage.getItem("userId")) {
            setIsLogin(true);
        }
    },[])
    return <div className="pt-5">
        {isLogin ? (
            <div className="flex flex-col w-full justify-center items-center ">
                <div className="flex p-3 w-[600px] border border-gray-700 rounded-2xl gap-3 bg-[#191919]">
                    <div>
                        <img src={imgUrl} alt="" className="w-12 h-11 rounded-3xl" />
                    </div>
                    <div className="w-full ">
                        <input type="text" placeholder="Whats on your mind?" className="w-full p-3 bg-[#191919] outline-none border-none"/>
                    </div>
                </div>
            </div>
        ):(
            <div className="flex flex-col w-full justify-center items-center">
                <div className="py-10 px-32 border border-gray-700">
                    <div className="py-5">
                        <h1 className="text-2xl font-semibold">The app for independent voices</h1>
                    </div>
                    <div className="flex gap-5 justify-center items-center">
                        <div className="bg-orange-600 px-2 py-2 rounded-lg font-semibold">
                            <button>Get Started</button>
                        </div>
                        <div className="border border-gray-700 px-2 py-2 rounded-lg font-semibold">
                            <button>Learn more</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
}