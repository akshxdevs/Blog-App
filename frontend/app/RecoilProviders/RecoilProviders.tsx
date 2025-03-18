"use client";
import React from "react"
import { RecoilRoot } from "recoil"

export const RecoilProviders = ({children}:{
    children:React.ReactNode
}) => {
    return <RecoilRoot>{children}</RecoilRoot>
}