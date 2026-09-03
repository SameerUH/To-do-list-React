import { useState, useEffect } from 'react';
import './App.css';
import TaskEntry from './TaskEntry';
import TaskOutput from './TaskOutput'

function App() {
    const [todos, setTodos] = useState([]);

    // Fetch all todos on load
    useEffect(() => {
        fetch('http://localhost:3000/api/todos')
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.error('Failed to fetch todos:', err));
    }, []);

    // Add a new todo — called by TaskEntry
    const addTodo = async (taskParams) => {
        const res = await fetch('http://localhost:3000/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskParams),
        });
        const newTodo = await res.json();
        setTodos([...todos, newTodo]);
    };

// and pass it down:
<TaskEntry callback={addTodo}/>

    // Delete a todo
    const deleteTodo = async (id) => {
        await fetch(`http://localhost:3000/api/todos/${id}`, {
            method: 'DELETE',
        });
        setTodos(todos.filter(t => t.id !== id));
    };

    return (
        <>
        <div className="flex justify-evenly h-15 w-full mt-[1em] mb-[200px] mx-auto my-0 bg-blue-200 border-2 border-black-200 items-center">
          <button className="rounded-full padding-[2em] bg-blue-100 text-black">Button1</button>
          <button className="rounded-full padding-[2em] bg-blue-100 text-black">Button2</button>
          <p className="decoration-solid ">{todos.length}</p>
          <button className="rounded-full padding-[2em] bg-blue-100 text-black">Button3</button>
          <button className="rounded-full padding-[2em] bg-blue-100 text-black">Button4</button>
        </div>

        <TaskEntry callback={addTodo}/>
        <div className="flex w-3/4 self-center border-b-1 mb-5">
            <p className="italic">Todays tasks ({new Date().toLocaleDateString("en-UK")}):</p>
        </div>

        {todos.map(todo => (
            <TaskOutput key={todo.id} data={todo} onDelete={deleteTodo} />
        ))}
        </>
    )
}

export default App