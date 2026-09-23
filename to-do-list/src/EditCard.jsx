import { useState, useEffect } from 'react';

function EditCard( {edit, setEdit} ) {
    return (
        <div className="flex absolute inset-0 backdrop-blur-xl h-full w-full justify-center">
            <div className="h-100 w-100 border-2 p-2 border-black rounded-md shadow-2xs self-center z-10 bg-(--bg)">
                <h2 className="italic underline text-left pl-8">Description:</h2>
                <textarea className="border-2 border-black w-full mb-2" placeholder="Enter task description..."></textarea>
                <h2 className="italic underline text-left pl-8">Category:</h2>
                <select className="border-2 border-black w-full mb-4">
                    <option value="Other">Other</option>
                    <option value="Personal">Personal</option>
                    <option value="Career">Career</option>
                    <option value="Education">Education</option>
                </select>
                <h2 className="italic underline text-left pl-8">Priority:</h2>
                <select className="border-2 border-black w-full mb-4">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <h2 className="italic underline text-left pl-8">Due Date:</h2>
                <input type="date" className="border-2 border-black w-full mb-4"></input>
                <input className="border-2 border-black w-3xs cursor-pointer" type="button" value="Update" onClick={() => setEdit(false)}></input>
            </div>
        </div>
    );
}

export default EditCard;