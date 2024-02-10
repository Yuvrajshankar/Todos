import React, { useEffect, useState } from 'react';
import "./Auth.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const register = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/signup', formData, { withCredentials: true });
            navigate("/");
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error('Email is already in use.');
            } else {
                console.error('Registration failed:', error.message);
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
                console.log("Don't have token");
            }
        };
        checkAuth();
    }, [navigate]);

    return (
        <div className="login">
            <ToastContainer />
            <h1 className="logo">Todos.</h1>

            <div className="login__container">
                <h1>Register</h1>
                <form onSubmit={register}>
                    <h5>User Name</h5>
                    <input type="text" placeholder='john' name='userName' onChange={handleChange} required />

                    <h5>E-mail</h5>
                    <input type="email" placeholder='john@gmail.com' name='email' onChange={handleChange} required />

                    <h5>Password</h5>
                    <input type="password" placeholder='*********' name='password' onChange={handleChange} required />

                    <button type="submit" className='login__button'>Register</button>
                </form>

                <p>
                    already a user? <Link to="/login" style={{ textDecoration: "none", color: "blue" }}><span>Log in</span></Link>
                </p>
            </div>
        </div>
    )
}

export default Register;