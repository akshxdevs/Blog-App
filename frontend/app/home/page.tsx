"use client";
import { useEffect, useState } from "react";
import { AppBar } from "../Components/AppBar";
import { Category } from "../Components/Category";
import { ImageSlider } from "../Components/ImageSlider";
import { Navbar } from "../Components/NavBar";
import { StartupCard } from "../Components/StartupCard";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";


export default function(){
    const [blogs,setBlogs] = useState<any[]>([]);
    useEffect(() => {
        const getAllBlogs = async () => {
          try {
            const res = await axios.get(`${BACKEND_URL}/blog/getblogs`, {
              headers: {
                authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMyZDNmNzYxLWUyNDMtNDIyZS1iMDgwLTc3Y2FjMzcxNjdlMyIsImlhdCI6MTc0MTk0MzQ2N30.FTJlHgETv0w9wEagB_VXn9V295Opus0hFYaDH20fqqo",
              },
            });
    
            if (res.data?.blogs) {
                setBlogs(res.data.blogs);
            }
          } catch (error) {
            console.error(error);
            toast.error("Something went wrong!!");
          }
        };
    
        getAllBlogs();
      }, []);
return <div>
        <AppBar/>
        <Navbar/>
        <Category/>
        <ImageSlider/>
        <StartupCard/>

        {blogs.map((blog,index)=>(
            <div key={index} className="py-">
            <div className="flex w-full flex-col justify-center items-center">
                <div className="flex justify-between gap-36 px-10 pt-10 pb-5">
                    <div className="flex gap-3">
                        <div className="">
                            <img src={blog.user?.profleImg} alt="profilePic" className="h-10 w-10 rounded-3xl"/>
                        </div>
                        <div className="">
                            <div className="flex gap-1">
                                <div>
                                    <h1 className="font-semibold text-lg">{blog.user?.name}</h1>
                                </div>
                                <div className="flex gap-1">
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </button>
                                    <p className="text-slate-400 text-sm mt-1">1d</p>
                                </div>
                            </div>
                            <div className="w-72">
                                <h2>{blog.subtitle}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex gap-3">
                            <div className="text-orange-600">
                                <button>Subscribe</button>
                            </div>
                            <div className="">
                                <button className="">...</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[500px] h-[340px]">
                    <div className="h-full w-full">
                        {blog.blogImages?.map((img:any,index:any)=>(
                                <img key={index} src={img.url} alt="" className="w-full h-full object-contain rounded-lg"/>
                        ))}
                    </div>
                    <div className="relative bottom-[88px] rounded-br-lg rounded-bl-lg p-3 bg-gray-700">
                            <div className="flex">
                                <div className="">
                                    <div className="flex gap-3">
                                        <div className="">
                                            <img src={blog.user?.profleImg} alt="profilePic" className="h-10 w-10 rounded-3xl"/>
                                        </div>
                                        <div>
                                            <p className="py-2 font-light text-slate-500">{blog.user?.handle}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-md font-semibold">{blog.title}</h1>
                                    </div>
                                </div>
                                <div className="ml-28">
                                    <div>
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="flex justify-center items-center border px-8 border-gray-700">
                    <div className="flex  gap-5">
                        <div>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </button>
                        </div>
                        <div className="">
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                </svg>
                            </button>
                        </div>
                        <div>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                            </button>
                        </div>
                        <div>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        ))}

    </div>
}

