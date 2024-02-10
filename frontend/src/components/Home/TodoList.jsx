import React, { useEffect } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';

function TodoList({ todos, updateTodos }) {
    useEffect(() => {
        const fetchData = async (res) => {
            try {
                const response = await axios.get('/todo', { withCredentials: true });

                updateTodos(response.data);
                // console.log('todos: ',setTodos);
            } catch (error) {
                console.error('Error fetching todos:', error.message);
            }
        };
        fetchData();
    }, [updateTodos]);

    const handleDelete = async (taskId) => {
        try {
            const response = await axios.delete(`/${taskId}`, { withCredentials: true });

            updateTodos(response.data.todos);
        } catch (error) {
            console.error('Error deleting todo:', error.message);
        }
    };

    return (
        <div className="list">
            {todos?.length > 0 ? (
                <ul className="todo__list">
                    {todos.map((todo) => (
                        <li key={todo._id} className='todo'>
                            <span>{todo.title}</span>
                            <DeleteOutlineIcon className='delete' onClick={() => handleDelete(todo._id)} />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="empty">
                    <p style={{ color: "rgb(155, 177, 243)", textAlign: "center" }}>No task found</p>
                </div>
            )}
        </div>
    )
}

export default TodoList;