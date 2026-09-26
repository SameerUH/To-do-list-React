import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import App from '../App';
import Pomodoro from '../Pomodoro';
import Settings from '../Settings';

function Navbar() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/todos')
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.error('Failed to fetch todos:', err));
    }, []);

    const addTodo = async (taskParams) => {
        const res = await fetch('http://localhost:3000/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskParams),
        });
        const newTodo = await res.json();
        setTodos([...todos, newTodo]);
    };

    const deleteTodo = async (id) => {
        await fetch(`http://localhost:3000/api/todos/${id}`, { method: 'DELETE' });
        setTodos(todos.filter(t => t.id !== id));
    };

    const editTodo = async (id, updatedFields) => {
        const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedFields),
        });
        const updated = await res.json();
        setTodos(todos.map(t => t.id === id ? { ...t, ...updated } : t));
    };

    const completeTodo = async (id) => {
        const todo = todos.find(t => t.id === id);
        const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...todo, completed: todo.completed ? 0 : 1 }),
        });
        const updated = await res.json();
        setTodos(todos.map(t => t.id === id ? { ...t, ...updated } : t));
    };

    return (
        <BrowserRouter>
            <div className="flex justify-evenly h-15 w-full mt-[1em] mb-8 mx-auto my-0 bg-blue-200 border-2 border-black items-center">
                <Link className="rounded-full padding-[2em] bg-blue-100 text-black" to="/">Todos</Link>
                <Link className="rounded-full padding-[2em] bg-blue-100 text-black" to="/pomodoro">Pomodoro</Link>
                <p className="decoration-solid rounded-full bg-black w-10 h-10 text-white flex items-center justify-center">{todos.length}</p>
                <Link className="rounded-full padding-[2em] bg-blue-100 text-black" to="/settings">Settings</Link>
            </div>

            <Routes>
                <Route path="/" element={
                    <App 
                        todos={todos} 
                        addTodo={addTodo} 
                        deleteTodo={deleteTodo} 
                        editTodo={editTodo} 
                    />
                }/>
                <Route path="/pomodoro" element={
                    <Pomodoro todos={todos} completeTodo={completeTodo}/>
                }/>
                <Route path="/settings" element={<Settings />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Navbar;