import React from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { useNavigate } from 'react-router';

const Login : React.FC = () => {
    const url = process.env.REACT_APP_NODE_URL;

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {

        if (usernameRef.current && passwordRef.current) {
            const username = usernameRef.current.value;
            const password = passwordRef.current.value;

            e.preventDefault()
            try {
                axios.post(url + '/api/login', {
                    username: username,
                    password: password,
                },
                { withCredentials: true }
            ).then(response => {
                    if (response.data) {
                        alert('Login Success!');
                        localStorage.setItem('accessToken', response.data.accessToken);
                    } else {
                        alert('Invalid ID or PW!');
                    }
                });
            } catch(err) {
                console.log(err);
            }
        }
    }

    const handleNavigate = () => {
        navigate('/signup');
    }

    return (
        <div>
            <h2>Login Page</h2>
            <form>
                <input type="text" placeholder="Username" ref={usernameRef}/>
                <br/>
                <input type="password" placeholder="Password" ref={passwordRef}/>
                <br/>
                <button onClick={handleLogin}>Login</button>
                <br/>
                <button onClick={handleNavigate}>Sign Up</button>
            </form>
        </div>
    )
}

export default Login;