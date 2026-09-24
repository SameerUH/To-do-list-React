//Imports:
import { useState, useEffect } from 'react';
import './App.css';
import TaskEntry from './TaskEntry';
import TaskOutput from './TaskOutput';
import EditCard from './EditCard';


function App() {
    const [todos, setTodos] = useState([]); //Stores the todos as an array.

    // Fetch all todos on load
    useEffect(() => {
        fetch('http://localhost:3000/api/todos') //Sends a request to the express server with all the todos stored.
            .then(res => res.json())
            .then(data => setTodos(data)) //Uses useState to store the tasks in the todos array.
            .catch(err => console.error('Failed to fetch todos:', err));
    }, []);

    // Add a new todo — called by TaskEntry
    const addTodo = async (taskParams) => {
        const res = await fetch('http://localhost:3000/api/todos', { //Sends a request to server.
            method: 'POST', //Specifies it a post request to add a task.
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskParams),
        });
        const newTodo = await res.json();
        setTodos([...todos, newTodo]); //Updates state by adding the new task to the end of array.
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

    //Filtering for certain dates:
    const today = new Date().toISOString().split('T')[0];
    const todaysTodos = todos.filter(todo => todo.date === today);
    const futureTodos = todos.filter(todo => todo.date > today);
    const pastTodos = todos.filter(todo => todo.date < today);

    const [editingTodo, setEditingTodo] = useState(null);

    const editTodo = async (id, updatedFields) => {
        const res = await fetch(`http://localhost:3000/api/todos/${id}`, {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(updatedFields),}); //Edits specific todo in express server.
        const updated = await res.json();
        setTodos(todos.map(t => t.id === id ? {...t, ...updated} : t)); //Goes through each todo to check which one has been edited and then adds new information on top of it.
    };

    return (
        <>
        <div className="flex justify-evenly h-15 w-full mt-[1em] mb-50 mx-auto my-0 bg-blue-200 border-2 border-black items-center">
          <button className="rounded-full padding-[2em] bg-blue-100 text-black">Button1</button>
          <button className="rounded-full padding-[2em] bg-blue-100 text-black">Button2</button>
          <p className="decoration-solid rounded-full bg-black w-10 h-10 text-white">{todos.length}</p>
          <button className="rounded-full padding-[2em] bg-blue-100 text-black">Button3</button>
          <button className="rounded-full padding-[2em] bg-blue-100 text-black">Button4</button>
        </div>

        <TaskEntry callback={addTodo}/>

        <div className="flex w-3/4 self-center border-b mb-5">
            <p className="italic">Overdue tasks:</p>
        </div>

        {pastTodos.map(todo => (
            <TaskOutput key={todo.id} data={todo} onDelete={deleteTodo} onEditClick={editTodo}/>
        ))}

        <div className="flex w-3/4 self-center border-b mb-5">
            <p className="italic">Todays tasks ({new Date().toLocaleDateString("en-UK")}):</p>
        </div>

        {todaysTodos.map(todo => (
            <TaskOutput key={todo.id} data={todo} onDelete={deleteTodo} onEditClick={editTodo}/>
        ))}

        <div className="flex w-3/4 self-center border-b mb-5">
            <p className="italic">Future tasks:</p>
        </div>

        {futureTodos.map(todo => (
            <TaskOutput key={todo.id} data={todo} onDelete={deleteTodo} onEditClick={editTodo}/>
        ))}

        {editingTodo && (
            <EditCard todo={editingTodo} onSave={editTodo} setEdit={() => setEditingTodo(null)}/>
        )}
        </>
    )
}

export default App