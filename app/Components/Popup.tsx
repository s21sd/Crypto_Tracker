"use client"
import React, { useState } from 'react'
import './pop.css'
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
const Popup = ({ password, close, setClose }: any) => {
    const [copy, setCopy] = useState<boolean>(false)

    const copyPassword = () => {
        navigator.clipboard.writeText(password);
        setCopy(true);
    }
    return (
        <div>
            <div onClick={() => setClose(!close)} className='flex justify-end cursor-pointer'>
                <IoMdClose color='white' size={36} />
            </div>
            <div className="notificationCard">

                <RiLockPasswordFill color='#7c73f6' size={45} />
                <p className="notificationHeading">Your Password</p>
                <h1 className="notificationPara">{password}</h1>
                <div className="buttonContainer">
                    <button onClick={copyPassword} className="AllowBtn">{copy ? "Copied" : "Copy"}</button>
                    {
                        copy ?
                            <button className="AllowBtn">Save</button> : <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default Popup