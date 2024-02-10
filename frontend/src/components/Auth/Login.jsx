import React, { useEffect, useState } from 'react';
import "./Auth.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/signin', formData, { withCredentials: true });
            navigate("/");
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error('Check Credentials');
            } else {
                console.error('Login failed:', error.message);
            }
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get('/check', { withCredentials: true });
                console.log("already have token")
                navigate("/");
            } catch (error) {
                navigate('/login');
            }
        };
        checkAuth();
    }, [navigate]);

    return (
        <div className="login">
            <ToastContainer />
            <h1 className="logo">Todos.</h1>

            <div className="login__container">
                <h1>Log in</h1>
                <form onSubmit={login}>
                    <h5>E-mail</h5>
                    <input type="email" placeholder='john@gmail.com' name='email' onChange={handleChange} required />

                    <h5>Password</h5>
                    <input type="password" placeholder='*********' name='password' onChange={handleChange} required />

                    <button type="submit" className='login__button'>Log in</button>
                </form>

                <p>
                    Not a user? <Link to="/register" style={{ textDecoration: "none", color: "blue" }}><span>Create an Account</span></Link>
                </p>
            </div>
        </div>
    )
}

export default Login;