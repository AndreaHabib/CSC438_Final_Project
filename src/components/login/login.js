
import { useState, React } from 'react';
import { signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link } from "react-router-dom"
import './login.css';

// import { useEffect } from 'react';
// import ApiClient from '../../api/ApiClient'


function Login() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({});


    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    // sample use of api client
    // useEffect(() => {
    //     const api = new ApiClient();
    //     api.getTrendingMovies().then(data => {
    //         console.log(data);
    //         });
    // })
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
                <img height="40px" src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png" />
                <span> Continue with Google</span>
            </button>

            <p>Need to SignUp? <Link to="/signup"> Click Here </Link></p>

        </div>
    );
}

export default Login;