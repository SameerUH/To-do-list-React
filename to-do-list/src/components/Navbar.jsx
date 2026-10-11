import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import App from '../App';
import Pomodoro from '../Pomodoro';
import Settings from '../Settings';
import Categories from '../Categories';

function Navbar() {
    const [todos, setTodos] = useState([]);
    const [bgcolour, setbgcolour] = useState(() => { return localStorage.getItem('bgcolour') || '#ffffff';})
    const [fontcolour, setfontcolour] = useState(() => { return localStorage.getItem('fontcolour') || '#000000'})

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

    useEffect(() => {
        document.documentElement.style.setProperty('--bg', bgcolour);
        document.documentElement.style.setProperty('--text', fontcolour)
        document.documentElement.style.setProperty('--text-h', fontcolour)
        localStorage.setItem('bgcolour', bgcolour);
        localStorage.setItem('fontcolour', fontcolour)
    }, [bgcolour, fontcolour]);

    return (
        <BrowserRouter>
            <div className="flex justify-evenly h-15 w-full mt-[1em] mb-8 mx-auto my-0 bg-blue-200 border-2 border-black items-center">
                <Link className="rounded-full padding-[2em] bg-blue-100 text-black p-2" to="/">Todos</Link>
                <Link className="rounded-full padding-[2em] bg-blue-100 text-black p-2" to="/pomodoro">Pomodoro</Link>
                <p className="decoration-solid rounded-full bg-black w-10 h-10 text-white flex items-center justify-center">{todos.filter(t => !t.completed).length}</p>
                <Link className="rounded-full padding-[2em] bg-blue-100 text-black p-2" to="/categories">Categories</Link>
                <Link className="rounded-full padding-[2em] bg-blue-100 text-black p-2" to="/settings">Settings</Link>
            </div>

            <Routes>
                <Route path="/" element={<App todos={todos} addTodo={addTodo} deleteTodo={deleteTodo} editTodo={editTodo}/>}/>
                <Route path="/pomodoro" element={<Pomodoro todos={todos} completeTodo={completeTodo} editTodo={editTodo}/>}/>
                <Route path="/categories" element={<Categories todos={todos} deleteTodo={deleteTodo} editTodo={editTodo}/>}/>
                <Route path="/settings" element={<Settings bgcolour={bgcolour} setbgcolour={setbgcolour} fontcolour={fontcolour} setfontcolour={setfontcolour}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Navbar;