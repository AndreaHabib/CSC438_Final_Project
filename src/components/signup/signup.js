import React from "react";
import "./signup.css";

const Signup = () => {
    return (
        <div className="signup">
        <div className="signup-container">
            <div className="signup-header">
            <h1>Signup</h1>
            </div>
            <div className="signup-form">
            <form>
                <label>
                <input type="email" placeholder="Email" />
                </label>
                <label>
                <input type="text" placeholder="Username" />
                </label>
                <label>
                <input type="password" placeholder="Password" />
                </label>
                <button>Signup</button>
            </form>
            </div>
        </div>
        </div>
    );
    }

    export default Signup;