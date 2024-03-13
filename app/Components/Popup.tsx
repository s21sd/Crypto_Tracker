"use client"
import React, { useState } from 'react'
import './pop.css'
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

import CryptoJS from 'crypto-js';
import { db, auth } from '../Utils/Firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useAppSelector } from '../redux/store';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
const Popup = ({ password, close, setClose }: any) => {
    const router = useRouter();
    const [copy, setCopy] = useState<boolean>(false)
    const [passName, setPassName] = useState<string>('');
    const [myencryptedPass, setEncryptedPass] = useState<string>('');

    const authenticated = useAppSelector((state) => state.authReducer);
    const copyPassword = () => {
        navigator.clipboard.writeText(password);
        setCopy(true);
    }
    const userId = authenticated.user?.user;
    const postCollectionRef = collection(db, `${userId}`);

    const storeEncryptedPassword = async () => {
        var encrypted = CryptoJS.AES.encrypt(password, "Message").toString();
        setEncryptedPass(encrypted);
        if (!userId) {
            toast.error("Login First");
            router.push('/');

        }
        // console.log(encrypted);
        try {
            if (passName.length > 0) {

                await addDoc(postCollectionRef, {
                    passName: passName,
                    encryptedPassword: encrypted
                });
                setTimeout(() => {
                    setClose(true)
                }, 2000)
            }
            else {
                toast.error("Please Provide a Password Name ")
            }
        } catch (error: any) {
            toast.error(error);
        }




    }
    return (
        <div>
            <div onClick={() => setClose(!close)} className='flex justify-end cursor-pointer'>
                <IoMdClose color='white' size={36} />
            </div>
            <div className="notificationCard">

                <RiLockPasswordFill color='#7c73f6' size={45} />
                <p className="notificationHeading">Your Password</p>
                <h1 className="notificationPara">Generated Password: {password}</h1>
                <h1 className="notificationPara">Encrypted Password: {myencryptedPass}</h1>
                <div className="buttonContainer">
                    <button onClick={copyPassword} className="AllowBtn">{copy ? "Copied" : "Copy"}</button>
                    {
                        copy ?
                            <div className='flex m-2 gap-2'>
                                <input className='rounded-full p-2 ml-2' value={passName} onChange={(e) => setPassName(e.target.value)} placeholder='Name of your Password' type='text' required />
                                <button onClick={storeEncryptedPassword} className="AllowBtn">Save</button>
                            </div> :
                            <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default Popup