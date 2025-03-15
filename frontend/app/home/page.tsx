"use client";
import { AppBar } from "../Components/AppBar";
import { Category } from "../Components/Category";
import { ImageSlider } from "../Components/ImageSlider";
import { Navbar } from "../Components/NavBar";


export default function(){
return <div>
        <AppBar/>
        <Navbar/>
        <Category/>
        <ImageSlider/>
    </div>
}