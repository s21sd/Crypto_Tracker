import React from 'react'
import { FcGoogle } from "react-icons/fc";
import logo from '../assets/logo2.webp'
import Image from 'next/image';

const Navbar = () => {

    return (
        <header className="text-white body-font">
            <div className="container mx-auto flex flex-wrap justify-between p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <Image src={logo} alt='logo' width={80} height={80} />
                    <span className="ml-3 text-2xl">CryptoTracker</span>
                </a>
                <button className="inline-flex items-center bg-[#F1F7F7] border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                    <FcGoogle size={36} />
                </button>
            </div>
        </header>
    )
}

export default Navbar