//Imports:
import { useState, useEffect, useCallback } from 'react';
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

    const quotes = [
        'There is no real excellence in all this world which can be sepearated from the right living.',
        'We are what we repeatedly do. Excellence, then, is not an act but a habit.',
        'I know of no more encouraging fact than the unquestionable ability of man to elevate his life by conscious endeavour.',
        'What lies behind us and what lies before us are tiny matters compared to what lies within us.',
        'Things which matter most must never be at the mercy of things which matter least.',
        'There can be no friendship without confidence, and no confidence without integrity.',
        'We have commited the Golden Rule to memory; let us know commit it to life.',
        'I take as my guide the hope of a saint: In crucial thngs, unity, in important things, diversity and in all things, generosity.',
        'Sometimes when I consider what tremendous consequences come from little things, I am tempted to think there are no little things.'
    ]

    const [newQuote, setnewQuote] = useState("");

    const shuffle = useCallback(() => {
        const index = Math.floor(Math.random() * quotes.length);
        setnewQuote(quotes[index]);
    }, []);

    useEffect(() => {
        const intervalID = setInterval(shuffle, 5000);
        return () => clearInterval(intervalID);
    }, [shuffle])

    return (
        <>
        <div className='flex border-black border-2 w-1/2 min mx-auto p-5 font-bold text-2xl mb-8 italic bg-white text-blue-700 justify-center'>
            <p>{newQuote}</p>
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

export default App;