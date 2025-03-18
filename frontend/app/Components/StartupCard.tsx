"use client";

import { useRecoilValue } from "recoil";
import { loginStateAtom } from "../recoil/atom";

export const StartupCard = () => {
    const isLogin = useRecoilValue(loginStateAtom);
    return <div className={isLogin ? "py-0" : "py-10"}>
        {!isLogin && (
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