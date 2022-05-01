import React from "react";
import { Link } from "react-router-dom"
import { useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";
// import "./signup.css";

function Signup() {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [user, setUser] = useState({});

    const register = async () => {

        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }

        if (user) {
            window.location.href = "/home";
        }
    };


    return (
        <div>
            <h1>Signup</h1>


            <input placeholder="Email" onChange={(event) => { setRegisterEmail(event.target.value); }} />
            <input placeholder="Password" onChange={(event) => { setRegisterPassword(event.target.value); }} /> 

            <button onClick={register}>Signup</button>


            <h2>Return to Login <Link to="/"> Click Here </Link></h2>


        </div>

    );
}

export default Signup;