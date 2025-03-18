import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react"
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Props{
    setLoginModel: Dispatch<SetStateAction<boolean>>
}
export const LoginComponenet = ({setLoginModel}:Props) => { 
    const [showPasswordField,setShowPasswordField] = useState(false);
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const[OTPVerifyModel,setOTPVerifyModel] = useState(false);
    const router = useRouter();
    return<div className="fixed inset-0 flex items-center justify-center bg-[#191919] bg-opacity-50 backdrop-blur-sm z-[999]">
        {OTPVerifyModel ? (
        <div className="bg-[#191919] p-10 rounded-lg shadow-lg w-[500px] flex-col justify-center items-center">
            <div className="px-2 pt-2 ml-44 mb-5 border rounded-md border-gray-500 w-fit">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                </button>
            </div>
            <h1 className="text-xl font-semibold text-center">Check your email to continue</h1>
            <h2 className="py-2 text-lg text-gray-500 text-center">We've sent an email to {email}. Click the magic link or enter the code below:</h2>
            
            <form className="max-w-sm mx-auto py-4 flex justify-center items-center">
                <div className="flex mb-2 space-x-2 rtl:space-x-reverse">
                    <div>
                        <label  className="sr-only">First code</label>
                        <input type="text" data-focus-input-init data-focus-input-next="code-2" id="code-1" className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                    </div>
                    <div>
                        <label  className="sr-only">Second code</label>
                        <input type="text" data-focus-input-init data-focus-input-prev="code-1" data-focus-input-next="code-3" id="code-2" className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                    </div>
                    <div>
                        <label  className="sr-only">Third code</label>
                        <input type="text" data-focus-input-init data-focus-input-prev="code-2" data-focus-input-next="code-4" id="code-3" className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                    </div>
                    <div>
                        <label  className="sr-only">Fourth code</label>
                        <input type="text" data-focus-input-init data-focus-input-prev="code-3" data-focus-input-next="code-5" id="code-4" className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                    </div>
                    <div>
                        <label  className="sr-only">Fifth code</label>
                        <input type="text" data-focus-input-init data-focus-input-prev="code-4" data-focus-input-next="code-6" id="code-5" className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                    </div>
                    <div>
                        <label  className="sr-only">Sixth code</label>
                        <input type="text" data-focus-input-init data-focus-input-prev="code-5" id="code-6" className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                    </div>
                </div>
            </form>

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
                  const res = await axios.post(`${BACKEND_URL}/user/signin`,{
                      username:email,
                  })
                  if (res.data) {
                      toast.success("OTP Genereated Successfully!!")
                      setOTPVerifyModel(true);
                      localStorage.setItem("userId",res.data.user.id);
                      localStorage.setItem("userId",res.data.token);
                      localStorage.setItem("userId",res.data.user.name);
                      localStorage.setItem("userId",res.data.user.handle);
                      router.push("/home");
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
