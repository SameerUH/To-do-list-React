//Imports:
import { useState, useEffect } from 'react';
import './App.css';
import TaskEntry from './components/TaskEntry';
import TaskOutput from './components/TaskOutput';
import EditCard from './components/EditCard';


function App({todos, addTodo, deleteTodo, editTodo}) {
    //Filtering for certain dates:
    const today = new Date().toISOString().split('T')[0];
    const todaysTodos = todos.filter(todo => todo.date === today && !todo.completed);
    const futureTodos = todos.filter(todo => todo.date > today && !todo.completed);
    const pastTodos = todos.filter(todo => todo.date < today && !todo.completed);

    const [editingTodo, setEditingTodo] = useState(null);

    return (
        <>
        <div className='flex border-black border-2 w-1/2 mx-auto p-5 font-bold text-2xl mb-8 italic bg-white text-blue-700'>
            <p>Insert inspirational quote...</p>
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