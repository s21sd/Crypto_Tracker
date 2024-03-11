"use client"
import React from 'react'
import Lottie from "lottie-react";
import Animation from "../assets/Animation - 1710193792835 (1).json"
import './Custom.css'
import Router, { useRouter } from 'next/navigation';
const Landing = () => {
    const router = useRouter();
    return (
        <div><section className="text-gray-800 body-font">
            <div className="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Your All-in-One Crypto Companion

                    </h1>
                    <p className="mb-8 leading-relaxed text-xl">Stay informed and in control of your <span className='text-white'>cryptocurrency</span>  investments with real-time tracking, <span className='text-white'>detailed</span> insights, and intuitive portfolio management tools.</p>
                    <div className="flex justify-center" onClick={() => router.push('/Dashboard')}>
                        <a className="swipe">Get Started <span className="container2"><svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg></span> </a>

                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 ">
                    <Lottie animationData={Animation} loop={true} />
                </div>
            </div>
        </section></div>
    )
}

export default Landing