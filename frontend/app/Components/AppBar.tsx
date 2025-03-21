"use client";
import { useEffect, useState } from "react"
import { LoginComponenet } from "./LoginComponent"
import { useRecoilValue } from "recoil";

export const AppBar = () =>  {
    const [showLoginModel,setShowLoginModel] = useState(false);
    const [isLogin,setIsLogin] = useState(false);
    useEffect(()=>{
        if (localStorage.getItem("userId")) {
            setIsLogin(true);
        }
    },[])
    return <div>
        <div className="fixed left-20 w-full bg-black z-50">
            <div className="flex justify-between p-4 border-b border-gray-800">
                <div>
                    <h1 className="text-2xl pl- py-3 font-bold">Home</h1>  
                </div>
                <div className="flex w-2/5 border my-2 border-gray-800 focus-within:border-blue-500 transition-all duration-200 h-10 rounded-3xl bg-[#191919]">
                    <button className="pl-5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                    <input type="text" placeholder="Search Substack" className="bg-[#191919] w-full pl-3 rounded-3xl outline-none"/>
                </div>
                {isLogin ? (
                    <div className="px-20 py-2">
                        <button className="bg-orange-600 px-2 py-2 rounded-lg font-semibold">DashBoard</button>
                    </div>
                ):(
                    <div className="flex px-20 py-2">
                        <div className="pr-5">
                            <button className="bg-gray-800 px-5 py-2 rounded-lg font-semibold" onClick={()=>{
                                setShowLoginModel(true)
                            }}>Sign in</button>
                        </div>
                        <div>
                            <button className="bg-orange-600 px-2 py-2 rounded-lg font-semibold">create account</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
        <div>
            {showLoginModel && (
                <LoginComponenet setLoginModel={setShowLoginModel}/>
            )}
        </div>
    </div>
}