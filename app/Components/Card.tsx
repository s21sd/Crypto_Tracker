import React, { useState } from 'react'
import { MdNoEncryption } from "react-icons/md";
import './card.css'
import CryptoJS from 'crypto-js';
const Card = ({ pass }: any) => {
    const [copy, setCopy] = useState<boolean>(false)
    // console.log(pass)
    var decrypted = CryptoJS.AES.decrypt(pass.encryptedPassword, "Message").toString(CryptoJS.enc.Utf8);
    //         console.log(decrypted);
    const copyPassword = () => {
        navigator.clipboard.writeText(decrypted);
        setCopy(true)

    }
    return (
        <div className="e-card playing">
            <div className="image"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>

            <div className="infotop flex justify-center flex-col items-center">
                <MdNoEncryption size={46} />
                <h1>Name:{pass.passName}</h1>
                <div className="name">
                    <h1>
                        Password:{decrypted}
                    </h1>
                </div>
                <button onClick={copyPassword} className="AllowBtn mt-5">{copy ? "Copied" : "Copy"}</button>

            </div>
        </div>
    )
}

export default Card