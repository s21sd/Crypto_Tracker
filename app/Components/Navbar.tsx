"use client"
import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import logo from '../assets/logo2.webp'
import Image from 'next/image';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../Utils/Firebase';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../redux/store';
import { logIn, logOut } from '../redux/features/auth-slice';
import { IoExit } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';

const Navbar = () => {
    const router = useRouter();
    const [picture, setPicture] = useState<string | any>("");
    const authenticated = useAppSelector((state) => state.authReducer);
    const dispatch = useDispatch<AppDispatch>()
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((res) => {
            // console.log(res.user.photoURL);
            setPicture(res.user.photoURL);
            dispatch(logIn({ isAuth: true, user: res.user.uid }));
            router.push('/Dashboard')
        })
    }
    // console.log(authenticated.user.user);
    const logoutWithGoogle = () => {
        signOut(auth).then(() => {
            toast.success("Sign-out successful")
            dispatch(logOut({ isAuth: false }));
            router.push('/')
        }).catch((error) => {
            toast.error(error);
        });
    }
    // console.log(authenticated);
    return (
        <header className="text-white body-font">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="container mx-auto flex flex-wrap justify-between p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <Image src={logo} alt='logo' width={80} height={80} />
                    <span className="ml-3 text-2xl">CryptoSafe</span>
                </a>
                {
                    authenticated.isAuth ?
                        <div className='flex justify-between items-center gap-3'>
                            <Image className='rounded-full' src={picture} width={40} height={40} alt='profile' />
                            <button onClick={logoutWithGoogle} className="inline-flex items-center  text-base mt-4 md:mt-0">
                                <IoExit size={46} />
                            </button>
                        </div> :

                        <button onClick={signInWithGoogle} className="inline-flex items-center bg-[#F1F7F7] border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                            <FcGoogle size={36} />
                        </button>
                }

            </div>
        </header >
    )
}

export default Navbar