"use client";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react"
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { loginStateAtom } from "../recoil/atom";

interface Props{
    setLoginModel: Dispatch<SetStateAction<boolean>>
}
export const LoginComponenet = ({setLoginModel}:Props) => { 
    const [showPasswordField,setShowPasswordField] = useState(false);
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const[OTPVerifyModel,setOTPVerifyModel] = useState(false);
    const [otp,setOtp] = useState();
    const [isLogin,setIsLogin] = useRecoilState(loginStateAtom)
    const router = useRouter();
    return<div className="fixed inset-0 flex items-center justify-center bg-[#191919] bg-opacity-50 backdrop-blur-sm z-[999]">
        {OTPVerifyModel ? (
        <div className="bg-[#191919] rounded-lg shadow-lg w-[500px] flex-col justify-center items-center">
            <div className="p-5 border-b border-gray-700">
                <div className="w-full">
                    <div className="px-2 pt-2 ml-52 mb-5 border rounded-md border-gray-500 w-fit">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                        </button>
                    </div>
                    <h1 className="text-xl font-semibold text-center">Check your email to continue</h1>
                    <h2 className="py-2 text-lg text-gray-500 text-center">We've sent an email to {email}. Click the magic link or enter the code below:</h2>
                    <div className="flex justify-center items-center gap-3">
                        <input type="text" className="w-fit border rounded-xl border-gray-700 mt-2  p-2 bg-[#191919] outline-none" placeholder="your otp" value={otp} onChange={(e:any)=>setOtp(e.target.value)} />
                        <button className="bg-orange-600 px-2 py-2 mt-2 rounded-lg font-semibold" onClick={async()=>{
                            try {
                                const res = await axios.post(`${BACKEND_URL}/user/signin/verify-otp`,{
                                    username:email,
                                    otp:otp
                                });
                                if (res.data) {
                                    toast.success("Login Successfull!!")!!
                                    localStorage.setItem("userId",res.data.user.id);
                                    localStorage.setItem("token",res.data.token);
                                    localStorage.setItem("name",res.data.user.name);
                                    localStorage.setItem("handle",res.data.user.handle);
                                    setOTPVerifyModel(false);
                                    setLoginModel(false);
                                    setIsLogin(true)
                                    router.push("/home");
                                }
                            } catch (error) {
                                console.error(error);
                                toast.error("Something Went Wrong!!");
                            }
                        }}>Verify</button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center py-3">
                    <div className="text-sm text-gray-600">
                        <p>Didn't get the email?</p>
                    </div>
                    <div className="text-orange-600 text-sm">
                        <p>Try again</p>
                    </div>
            </div>
        </div>
    ):(
        <div className="bg-[#191919] p-6 rounded-lg shadow-lg w-96">
        <div className="flex flex-col justify-between items-center">
          <div className="flex flex-row-reverse w-full">
              <button
              className="text-slate-100 hover:text-gray-900"
              onClick={() => setLoginModel(false)}
              >   
              ✖
              </button>
          </div>
          <h1 className="text-slate-100 font-semibold text-lg">Sign in to Substack</h1>
          <div className="flex gap-2 py-2">
              <h2 className="text-gray-500">First time here?</h2> 
              <h2 className="text-orange-600">Create account</h2>
          </div>
          <div className="w-full mb-3 rounded-xl focus-within:border-blue-500 transition-all duration-200  bg-[#191919]">
              <input type="text" placeholder="Your email" className="w-full border rounded-xl border-gray-700  p-2 bg-[#191919] outline-none" value={email} onChange={(e:any)=>setEmail(e.target.value)}/>
              {showPasswordField && (
                  <input type="text" placeholder="Your password" className="w-full border rounded-xl border-gray-700 mt-2  p-2 bg-[#191919] outline-none" value={password} onChange={(e:any)=>setPassword(e.target.value)}/>
              )}
          </div>
          <div className="bg-orange-600 p-2 rounded-lg font-semibold w-full text-center">
              <button onClick={async()=>{
                try {
                    const res = await axios.post(`${BACKEND_URL}/user/signin`,{
                        username:email,
                    })
                    if (res.data) {
                        toast.success("OTP Genereated Successfully!!")
                        setOTPVerifyModel(true);
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("Something Went Wrong!!");
                }
              }}>Continue</button>
          </div>
          <div className="py-2">
              <div className="flex gap-3">
                  <div className="relative bottom-2 text-gray-700"><p className="">_______________</p></div>
                  <p>or</p>
                  <div className="relative bottom-2 text-gray-700">_______________</div>
              </div>
          </div>
          <div className="border border-gray-600 p-2 rounded-lg font-semibold w-full text-center">
              <button onClick={()=>setShowPasswordField((prev)=>!prev)}>Sign in with Password</button>
          </div>
        </div>
      </div>
    )}

  </div>
}
