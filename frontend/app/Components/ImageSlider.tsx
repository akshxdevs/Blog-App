"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export const ImageSlider = () => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const visibleImages = 5; 

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/blog/getblogs`, {
          headers: {
            authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMyZDNmNzYxLWUyNDMtNDIyZS1iMDgwLTc3Y2FjMzcxNjdlMyIsImlhdCI6MTc0MTk0MzQ2N30.FTJlHgETv0w9wEagB_VXn9V295Opus0hFYaDH20fqqo",
          },
        });

        if (res.data?.blogs) {
          setBlogPosts(res.data.blogs);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong!!");
      }
    };

    getAllBlogs();
  }, []);

  const nextSlide = () => {
    if (currentIndex + visibleImages < blogPosts.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="">
      <div className="relative w-full max-w-7xl mx-40 my-20 top-20 z-10">
        <div className="relative overflow-hidden w-full">
          <div className="flex gap-1 transition-transform duration-500 ease-in-out" 
            style={{ transform: `translateX(-${currentIndex * (100 / visibleImages)}%)` }}
          >
            {blogPosts.map((blog, index) => (
              <div key={index} className="w-[calc(100%/5)] flex-shrink-0 border h-fit  border-gray-900 rounded-xl" onClick={()=>router.push(`/blog/${blog.id}`)}>
                {blog.blogImages?.map((img:any,index:any)=>(
                  <div key={index}>
                    <div>
                    <img src={img.url} alt="" className="w-full h-80 object-cover rounded-lg"/>
                    </div>
                  </div>
                ))}
                <div className="absolute bottom-0 w-full bg-gradient-to-t  via-black to-transparent from-black p-4">
                  <p className="text-gray-300 text-xs font-semibold">{blog.user?.name}</p>
                  <h3 className="text-white text-lg font-bold w-52">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2">
                    <span className="bg-gray-700 text-white px-2 py-1 text-xs rounded-md">New</span>{" "}
                    · 8m read
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
        {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute top-72 left-24 transform -translate-y-1/1 bg-black  p-2 text-white rounded-full hover:bg-gray-800"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {currentIndex + visibleImages < blogPosts.length && (
            <button
              onClick={nextSlide}
              className="absolute top-72 right-5 transform -translate-y-1/1 bg-black bg-opacity-40 p-2 rounded-full text-white hover:bg-gray-800"
            >
              <ChevronRight size={28} />
            </button>
          )}
      </div>
  );
};
