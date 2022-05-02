import {useState, React} from "react";
import {auth} from "../../firebase-config";
import {onAuthStateChanged, signOut} from "firebase/auth";
import { Link } from "react-router-dom"

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

                    <button onClick={logout}><Link to="/"> Logout </Link> </button>
               
                
        </div>
    );
}

export default Home;