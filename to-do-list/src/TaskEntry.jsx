import { useState } from "react";


function TaskEntry(props) {
    const [task, setTask] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("")


    const addButton = () => {
        props.callback({task: task, category: category, date : date});
    };

    return (
        <div className="mb-[2em]">
            <form className="flex h-10 mx-auto my-0 justify-center w-5/6">
                <div className="h-base w-20 bg-red-600 border-2 border-black-200"></div>
                <input className="border-2 border-black-200 w-md" type="text" placeholder="Add a new todo..." name="task" value={task} onChange={(e) => setTask(e.target.value)}/>
                <select className="border-2 border-black-200" name="category" onChange={(e) => setCategory(e.target.value)}>
                    <option value="Other">Other</option>
                    <option value="Personal">Personal</option>
                    <option value="Career">Career</option>
                    <option value="Education">Education</option>
                </select>
                <input type="date" className="border-2 border-black-200" value={date} onChange={(e) => setDate(e.target.value)}></input>
                <input className="border-2 border-black-200 w-2xs cursor-pointer" type="button" value="ADD" onClick={addButton}/>
            </form>
        </div>
    );
}

export default TaskEntry;