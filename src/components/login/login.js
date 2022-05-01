import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom"
import './login.css';
import {signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";

function Login() {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({});

    const login = async () => {
            
            try {
                const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
                console.log(user);
            } catch (error) {
                console.log(error.message);
            }

            if(user){
                window.location.href = "/home";
            }

    };

    return (
        <div>

            <h1>Login</h1>

            <input type="email" placeholder="Email" onChange={(event) => { setLoginEmail(event.target.value) }} />

            <input type="password" placeholder="Password" onChange={(event) => { setLoginPassword(event.target.value) }} />

            <button onClick={login}>Login</button>

            <p>Need to SignUp? <Link to="/signup"> Click Here </Link></p>

        </div>
    );
}

export default Login;