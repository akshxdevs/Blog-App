"use client";
import { useEffect, useState } from "react";
import { Merriweather } from 'next/font/google';
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";

const merriweather = Merriweather({ subsets: ['latin'], weight: '400' });
export default function (){
    const [handle,setHandle] = useState<string|null>(null);
    const [userId,setUserId] = useState<string|null>(null);
    const [token,setToken] = useState<string|null>(null);
    const [title,setTitle] = useState();
    const [subtitle,setSubtitle] = useState();
    const [writting,setWritting] = useState();
    const router = useRouter();
    useEffect(()=>{
        const storedHandle = localStorage.getItem("handle");
        const storedUserId = localStorage.getItem("userId");
        const storedToken = localStorage.getItem("token");
        if (storedHandle && storedUserId && storedToken) {
            setHandle(storedHandle);
            setUserId(storedUserId);
            setToken(storedToken); 
        }
    },[])
    return <div>
        <div className="fixed w-full z-999 bg-[#0a0a0a]">
            <div className="flex justify-between p-1">
                <div className="flex gap-5 p-3">
                    <div>
                        <button className="border p-3 rounded-lg border-gray-700" onClick={()=>{
                            router.push("/home")
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex gap-1">
                        <p className="text-green-500  text-4xl">.</p>
                        <p className="py-4 font-semibold text-slate-200">Draft</p>
                    </div>
                </div>
                <div className="flex gap-4 p-3">
                    <div>
                        <button className="border border-gray-700 px-2 py-2 rounded-lg font-semibold">Preview</button>
                    </div>
                    <div>
                        <button className="bg-orange-600 px-2 py-2 rounded-lg font-semibold" onClick={async()=>{
                            try {
                                if (!title || !subtitle || !writting) {
                                    return toast.error("All Fields Required!!")
                                }
                                const res = await axios.post(`${BACKEND_URL}/blog/createblog/${userId}`,{
                                    title:title,
                                    subtitle:subtitle,
                                    writings:writting,
                                },{
                                    headers:{
                                        authorization:token
                                    }
                                });
                                if (res.data) {
                                    toast("Blog Published Successfully!!")
                                }
                            } catch (error) {
                                console.error(error);
                                toast.error("Something went wrong!!")
                            }
                        }}>Publish</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="fixed w-full z-100">
            <div className="relative top-20">
                <div className="flex flex-row justify-center items-center">
                    <div className="flex flex-row">
                        <div className="flex gap-3">
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                </svg>
                            </button>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                                </svg>
                            </button>
                            <p className="text-3xl">|</p>
                        </div>
                        <div className="flex gap-3 px-3">
                            <p className="py-2">style</p>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                            <p className="text-3xl">|</p>
                        </div>
                        <div className="flex gap-3">
                            <h1 className="py-2">{"<>"}</h1>
                            <p className="text-3xl">|</p>
                        </div>
                        <div className="flex gap-3 px-2">
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                </svg>
                            </button>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                            </button>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                                </svg>
                            </button>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>
                            </button>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                </svg>
                            </button>
                            <p className="text-3xl">|</p>
                        </div>
                        <div className="flex py-2 gap-3 px-2">
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                            </button>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-3xl">|</p>
                        <div className="flex px-2">
                            <div className="flex gap-2 p-2">
                                <div>
                                    <button>button</button>
                                </div>
                                <div>
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <p className="text-3xl">|</p>
                            <div className="flex gap-2 p-2">
                                <div>
                                    <button>More</button>       
                                </div>
                                <div>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </button> 
                                </div>

                            </div>
                            <p className="text-3xl">|</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
        <div className="relative top-36 left-[350px] w-[850px] py-5">
            <div className="p-5 w-[730px] mx-10 bg-slate-50 rounded-xl">
                <h1 className="text-lg font-semibold text-black">Help your friends start a Substack</h1>
                <p className="py-2 text-gray-700">Know someone who would be great on Substack? Insert your referral button to get credit for bringing them onboard and expand your network for recommendations, cross posts, and more.</p>
                <div className="flex gap-3 pt-2">
                   <button className="bg-slate-200 text-slate-700 p-2 text-sm rounded-lg font-semibold">Not now</button>
                    <button className="bg-orange-600 p-2 text-sm rounded-lg font-semibold">Add referal button</button>
               </div>
            </div>
            <div className="my-3 mx-10">
                <div className="flex py-2 text-black text-sm gap-3 px-5  w-fit bg-slate-200 rounded-xl">
                    <h1>Edit email header / footer </h1>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="py-3 px-10" >
                <div className="">
                    <input type="text" placeholder="Title" className="text-4xl font-bold text-gray-600 bg-[#0a0a0a] p-3 outline-none border-none w-full" value={title}  onChange={(e:any)=>setTitle(e.target.value)}/>
                </div>
                <div className="">
                    <input type="text" placeholder="Add a subtitle..." className="text-xl font-bold text-gray-600 bg-[#0a0a0a] p-2 outline-none border-none w-full"  value={subtitle}  onChange={(e:any)=>setSubtitle(e.target.value)}/>
                </div>
                <div className="p-3">
                    <div className="flex gap-3">
                        <div className="flex gap-3 border border-gray-700 px-2 rounded-xl">
                            <h1 className="py-2">{handle}</h1>
                            <button className="p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="">
                            <button className="border p-2 rounded-xl border-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={merriweather.className}>
                    <input type="text" placeholder="Start writing..." className="text-md border-none font-bold text-gray-600 bg-[#0a0a0a] p-2 outline-none w-full"  value={writting}  onChange={(e:any)=>setWritting(e.target.value)}/>
                </div>
            </div>
        </div>
    </div>
}