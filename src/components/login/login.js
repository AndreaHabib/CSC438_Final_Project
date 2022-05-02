import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom"
import './login.css';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { useHistory } from 'react-router-dom'

function Login() {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({});


    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const signInWithGoogle = async () => {
            signInWithPopup(auth, provider)
                .then((result) => {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    const user = result.user;
                    window.location.href = "/home";
                }).catch((error) => {
                    const errorCode = error.code;
                    console.log(errorCode);
                    const errorMessage = error.message;
                    console.log(errorMessage);
                    const email = error.email;
                    console.log(email);
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    console.log(credential);
            
                });

        }


    const login = async () => {

            try {
                const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
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

                <h1>Login</h1>

                <input type="email" placeholder="Email" onChange={(event) => { setLoginEmail(event.target.value) }} />

                <input type="password" placeholder="Password" onChange={(event) => { setLoginPassword(event.target.value) }} />

                <button onClick={login}>Login</button>

                <button className="login-provider-button" onClick={signInWithGoogle}>
                    <img height="40px"src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png" />
                    <span> Continue with Google</span>
                </button>

                <p>Need to SignUp? <Link to="/signup"> Click Here </Link></p>

            </div>
        );
    }

    export default Login;