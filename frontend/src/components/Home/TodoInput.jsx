import axios from 'axios';
import React, { useState } from 'react'

function TodoInput({ updateTodos }) {
    const [todo, setTodo] = useState({
        title: '',
    });

    const handleChange = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value });
    };

    const addTodo = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/create', todo, { withCredentials: true });
            updateTodos(response.data);
        } catch (error) {
            console.error('Error adding Todo:', error.message);
        }
    };

    return (
        <div className="input">
            <input type="text" placeholder='create a new todo' name='title' onChange={handleChange} />
            <button type="submit" className='add__button' onClick={addTodo}>Add</button>
        </div>
    )
}

export default TodoInput;