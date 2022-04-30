import React from 'react';
import './login.css';

const Login = () => {
    return (
        <div className="login">
            <div className="login-container">
                <div className="login-header">
                    <h1>Login</h1>
                </div>
                <div className="login-form">
                    <form>
                        <label>
                            <input type="text" placeholder="Username" />
                        </label>
                        <label>
                            <input type="password" placeholder="Password" />
                        </label>
                        <button>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;