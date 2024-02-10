import React, { useEffect, useState } from 'react'
import "./Home.css";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Home() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);

    const updateTodos = (newTodos) => {
        setTodos(newTodos);
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get('/check', { withCredentials: true });
                console.log("already have token")
            } catch (error) {
                navigate('/login');
            }
        };
        checkAuth();
    }, [navigate]);

    const logout = async (e) => {
        e.preventDefault(e);
        try {
            await axios.post('/logout', { withCredentials: true });
            // console.log("success");
            navigate("/login");
        } catch (error) {
            console.error('Logout Failed:', error.message);
        }
    };

    return (
        <div className="home">
            <nav>
                <h1>Todos.</h1>
                <button onClick={logout}><PowerSettingsNewIcon className='power' />Logout</button>
            </nav>
            <hr color='royalblue' />

            <TodoInput updateTodos={updateTodos} />
            <TodoList todos={todos} updateTodos={updateTodos} />
        </div>
    )
}

export default Home;