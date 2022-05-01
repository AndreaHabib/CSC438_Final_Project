import React from "react";

import {auth} from "../../firebase-config";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {useState} from "react";

function Home() {

    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <div>
                    <h1>{user?.email}</h1>

                    <button onClick={logout}>Logout</button>
               
                
        </div>
    );
}

export default Home;