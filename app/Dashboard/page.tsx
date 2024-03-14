"use client"
import React, { useEffect, useState } from "react"
import Popup from "../Components/Popup";
import Card from "../Components/Card";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/store";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../Utils/Firebase";

type passType = {
    encryptedPassword: string;
    passName: string;
    userId: string;
}
const page = () => {
    const [close, setClose] = useState<boolean>(false);
    const [password, setpassWord] = useState<string>("");
    const [lenght, setRangeValue] = useState(0);
    const [includeUpperChars, setIncludeUpperChars] = useState(false);
    const [includeLowerChars, setIncludeLowerChars] = useState(false);
    const [includeNumber, setIncludeNumbers] = useState(false);
    const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
    const authenticated = useAppSelector((state) => state.authReducer);
    const [strength, setStrength] = useState("");
    const [firebasePass, setfirebasePass] = useState<passType[]>([])
    const userId = authenticated.user?.user
    const postCollectionRef = collection(db, `${userId}`)
    // Retriving my all the password
    const getPasswords = async () => {
        const pass = await getDocs(postCollectionRef);
        const newdata: passType[] = pass.docs.map((doc) => ({ userId: doc.id, ...doc.data() } as passType));
        setfirebasePass(newdata);
    }
    useEffect(() => {
        getPasswords();
    }, [userId,password,close])
    const handleUpperChange = (event: any) => {
        setIncludeUpperChars(event.target.checked);
    }
    const handleLoweerChange = (event: any) => {
        setIncludeLowerChars(event.target.checked);

    }
    const handleNumberChange = (event: any) => {
        setIncludeNumbers(event.target.checked);

    }
    const handleSpecialChange = (event: any) => {
        setIncludeSpecialChars(event.target.checked);
    }




    const handleChages = (event: any) => {
        setRangeValue(event.target.value)
    };

    function generatePassword() {
        setClose(false);

        let characters = "";
        let newPassword = "";

        if (includeUpperChars) {
            let upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            characters += upperCase;


        }

        if (includeLowerChars) {
            let lowerCase = "abcdefghijklmnopqrstuvwxyz";

            characters += lowerCase;

        }

        if (includeNumber) {
            let number = "0123456789";

            characters += number;


        }

        if (includeSpecialChars) {
            let specialChar = "!@#$%&*";
            characters += specialChar;
        }

        for (let i = 0; i < lenght; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            newPassword += characters.charAt(randomIndex);
        }

        setpassWord(newPassword);
        let strength = "Low";
        if (password.length >= 8) {
            strength = "Strong";
        }
        else if (password.length >= 6) {
            strength = "Medium";

        }
        setStrength(strength);


    }

    return (
        <div className="main ">

            <div className="maincontainer relative shadow-md rounded-2xl">

                <div className="allcheckbox">
                    <div className="rangediv">
                        <label><span className="chlength">Length</span>

                            <input onChange={handleChages} className="range" type="range" min="0" max="20" value={lenght} ></input>
                        </label>
                    </div>

                    <label>
                        <input checked={includeUpperChars} onChange={handleUpperChange} className="checkbox" type="checkbox"></input>Include Uppercase Letters
                    </label>

                    <label>
                        <input checked={includeLowerChars} onChange={handleLoweerChange} className="checkbox" type="checkbox"></input>Include Lowercase Letters
                    </label>


                    <label>
                        <input checked={includeNumber} onChange={handleNumberChange} className="checkbox" type="checkbox"></input>Include Numbers
                    </label>



                    <label>
                        <input checked={includeSpecialChars} onChange={handleSpecialChange} className="checkbox" type="checkbox"></input>Include Symbols
                    </label>


                </div>

                <div className="strength">
                    <h1 className="strength--h1">Strength</h1>
                    <p className="strength--type">{strength}</p>
                </div>
                <div>
                    <button onClick={generatePassword} className="generate-btn">Generate</button>
                </div>


            </div>
            {
                password.length > 0 && !close ? <div className="absolute flex ml-[35%] mt-[5%]">

                    <Popup password={password} close={close} setClose={setClose} />
                </div>
                    : <></>
            }

            {/* Here All the Password will Show */}
            <div>
                <h1 className="font-bold text-2xl mt-12 ml-12">Your Passwords</h1>
                <div className="flex justify-between gap-5 m-12 flex-wrap">

                    {
                        firebasePass.map((pass, index) => {
                            return (
                                <Card key={index} pass={pass} />
                            )
                        })
                    }

                </div>
            </div>
        </div>


    )

}

export default page