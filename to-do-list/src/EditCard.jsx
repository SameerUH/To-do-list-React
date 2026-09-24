import { useState, useEffect } from 'react';

function EditCard( {todo, onSave, setEdit} ) {
    //Passing through task for the edit card.
    const [task, setTask] = useState(todo.task);
    const [description, setDescription] = useState(todo.description || '');
    const [category, setCategory] = useState(todo.category);
    const [priority, setPriority] = useState(todo.priority || 'Low');
    const [date, setDate] = useState(todo.date);

    const handleUpdate = () => {
        onSave(todo.id, {task, description, category, priority, date});
        setEdit(false);
    };

    return (
        <div className="flex absolute inset-0 backdrop-blur-xl h-full w-full justify-center">
            <div className="h-120 w-100 border-2 p-2 border-black rounded-md shadow-2xs self-center z-10 bg-(--bg)">
                <h2 className="italic underline text-left pl-8">Name:</h2>
                <textarea className="border-2 border-black w-full mb-2" value={task} onChange={(e) => setTask(e.target.value)}></textarea>
                <h2 className="italic underline text-left pl-8">Description:</h2>
                <textarea className="border-2 border-black w-full mb-2" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <h2 className="italic underline text-left pl-8">Category:</h2>
                <select className="border-2 border-black w-full mb-4" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Other">Other</option>
                    <option value="Personal">Personal</option>
                    <option value="Career">Career</option>
                    <option value="Education">Education</option>
                </select>
                <h2 className="italic underline text-left pl-8">Priority:</h2>
                <select className="border-2 border-black w-full mb-4" value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <h2 className="italic underline text-left pl-8">Due Date:</h2>
                <input type="date" className="border-2 border-black w-full mb-4" value={date} onChange={(e) => setDate(e.target.value)}></input>
                <input className="border-2 border-black w-3xs cursor-pointer" type="button" value="Update" onClick={handleUpdate}></input>
            </div>
        </div>
    );
}

export default EditCard;