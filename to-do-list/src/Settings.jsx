import { useState } from 'react';
import logo from './assets/settings.png'

console.log(logo);

function Settings({bgcolour, setbgcolour, fontcolour, setfontcolour, todos, addTodo}) {
    
    //Export to JSON:
    const exportJSON = () => {
        const datastring = JSON.stringify(todos, null, 2);
        const blob = new Blob([datastring], {type: 'application/json'});
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'todos.json';
        link.click();

        URL.revokeObjectURL(url);
    };

    //Export to CSV:
    const exportCSV = () => {
        const headers = ['id', 'task', 'category', 'date', 'description', 'priority', 'completed'];
        const rows = todos.map(todo => headers.map(h => `"${String(todo[h] ?? '').replace(/"/g, '""')}"`).join(','));
        const csvdata = [headers.join(','), ...rows].join('\n');

        const blob = new Blob([csvdata], {type: 'text/csv'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'todos.csv';
        link.click();
        URL.revokeObjectURL(url);
    };


    //Import from JSON:
    const importJSON = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const text = await file.text();
        const importedTodos = JSON.parse(text);

        for (const todo of importedTodos) {
            await addTodo({
                task: todo.task,
                category: todo.category,
                date: todo.date,
                description: todo.description || '',
                priority: todo.priority || 'Low'
            });
        }
    }

    //Import from CSV:
    const importCSV = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const text = await file.text();
        const lines = text.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());

        for (let i =1; 1 < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.replace(/"/g, '').trim());
            const todo = {};
            headers.forEach((h, idx) => {todo[h] = values[idx]; });

            await addTodo({
                task: todo.task,
                category: todo.category,
                date: todo.date,
                description: todo.description || '',
                priority: todo.priority || 'Low'
            });
        }
    }

    return (
    <>
        <img className="flex justify-center w-1/8 self-center" src={logo} alt="Settings logo" />
        <h1 className="underline">Settings page</h1>

        <h2 className='italic'>Colour changer:</h2>
        <div>
            <div className='flex justify-center mx-auto my-0 border-black w-1/2 mb-10'>
                <p className='border-black p-5 border-2 text-lg font-medium'>Change background colour: </p>
                <input type='color' value={bgcolour} onChange={(e) => setbgcolour(e.target.value)} className='w-20 h-20 border-black border-2 cursor-pointer'/>
            </div>

             <div className='flex justify-center mx-auto my-0 border-black w-1/2 mb-10'>
                <p className='border-black p-5 border-2 text-lg font-medium'>Change font colour: </p>
                <input type='color' value={fontcolour} onChange={(e) => setfontcolour(e.target.value)} className='w-20 h-20 border-black border-2 cursor-pointer'/>
            </div>
        </div>

        <h2 className='italic'>Imports/Exports:</h2>
        <div className='flex justify-evenly self-center w-full mb-5'>
            <button className="border-2 border-black p-2 bg-white w-1/6 rounded-xl cursor-pointer" Click={exportJSON}>Export as JSON</button>
            <button className="border-2 border-black p-2 bg-white w-1/6 rounded-xl cursor-pointer" onClick={exportCSV}>Export as CSV</button>
        </div>

        
        <label className='flex justify-between border-2 border-black bg-white mb-5 w-1/2 mx-auto my-0 h-10'>
            <span className='flex-1 text-center mx-0 my-auto'>Import JSON:</span>
            <input className="border-2 border-black bg-gray-400 w-1/2 h-8 my-auto mx-0" type="file" accept=".json" onChange={importJSON}></input>
        </label>
        <label className='flex justify-between border-2 border-black bg-white mb-5 w-1/2 mx-auto my-0 h-10'>
            <span className='flex-1 text-center mx-0 my-auto'>Import CSV:</span>
            <input className="border-2 border-black bg-gray-400 w-1/2 h-8 my-auto mx-0" type="file" accept=".csv" onChange={importCSV}></input>
        </label>
    </>
    );
}

export default Settings;