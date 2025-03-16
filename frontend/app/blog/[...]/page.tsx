"use client";
import { Navbar } from "@/app/Components/NavBar";
import { BACKEND_URL } from "@/app/config";
import axios from "axios";
import {  LucideOption, Option, OptionIcon, X } from "lucide-react";
import { Play } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function(){
    const params = useParams()
    const blogId = params[""]?.[0]
    console.log(blogId);
    const router = useRouter();
    
    const [blog,setBlog] = useState<any[]>([]);
    useEffect(()=>{
        const getblog = async() => {
            try {
                const res = await axios.get(`${BACKEND_URL}/blog/getblog/${blogId}`,{
                    headers:{
                        authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMyZDNmNzYxLWUyNDMtNDIyZS1iMDgwLTc3Y2FjMzcxNjdlMyIsImlhdCI6MTc0MTk0MzQ2N30.FTJlHgETv0w9wEagB_VXn9V295Opus0hFYaDH20fqqo"
                    }
                })
                if (res.data) {
                    console.log(res.data);
                    setBlog(res.data.blogs)
                }
            } catch (error) {
                    console.error(error);
                    toast.error("Something went wrong!!");
                  }
        }
        getblog();
    },[])
    return <div className="overflow-hidden">
        <Navbar/>
        <div className="relative items-center left-20 max-w-[1420px] m-5 p-5">
            <div className="flex justify-between border-b border-gray-700">
                <div className="flex justify-center items-center mb-8 px-2 pt-2 bg-gray-800 rounded-lg">
                    <button onClick={()=>{
                        router.push("/home")
                    }}><X size={24}/></button>
                </div>
                <div>
                    <img src="" alt="profilePic" />
                </div>
                <div className="flex gap-10 mb-8">
                    <div className="px-2 pt-2 bg-gray-800 rounded-lg">
                        <button>Subscribe</button>
                    </div>
                    <div>
                        <button><Play size={24} color="red"/></button>
                    </div>
                    <div>
                        <button>...</button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col max-w-full w-full py-10 ">
                <div className="px-80 w-full ">
                    {blog.map((log,index)=>(
                        <div key={index} className="border-b border-gray-900">
                            <p className="text-xs font-semibold text-gray-500">{log.user?.name}</p>
                            <h1 className="text-4xl font-bold py-2">{log.title}</h1>
                            <h2 className="text-sm font-extralight py-2 text-gray-500">{log.subtitle}</h2>
                            <div className="flex gap-3 pb-3 pt-5">
                                <div>
                                    <img src="" alt="profilePic" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-100">{log.user?.name}</p>
                                    <p className="text-[10px] text-gray-500">{log.createdOn}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="py-3">
                        {blog.map((log,index)=>(
                            <div key={index} className="py-10">
                                {log.blogImages?.map((img:any,index:any)=>(
                                    <div className="flex flex-col justify-center items-center">
                                        <img src={img.url} alt="" className="w-[800px] h-[500px] object-cover" />
                                        <div>
                                            <p className="pt-2 text-sm font-light text-center text-gray-500 w-[550px]">Richard Hamilton, Just what is it that makes today’s homes so different, so appealing?, 1956, Kunsthalle Tübingen</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="px-72">
                        {blog.map((log,index)=>(
                            <div key={index} className="">
                                <p className="text-lg">{log.writings}</p>
                            </div>
                        ))}
                    </div>
            </div>
        </div>
    </div>
}