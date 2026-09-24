import { useState } from "react";
import ErrorCard from "./ErrorCard";
import EditCard from "./EditCard";


function TaskEntry(props) {
    const [task, setTask] = useState("");
    const [category, setCategory] = useState("Other");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Low");
    const [error, setError] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const addButton = () => {
        if (task.length <= 0 || date.length <= 0) {
            if (error) return
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000)
            return
        }
        props.callback({task, category, date, description, priority});
        setTask(""); setCategory("Other"); setDate(""); setDescription(""); setPriority(""); //Clears form for next task to be inputted.
    };

    const saveDraftDetails = (_, updatedFields) => { //Underscore appears to be a fake parameter and we aren't even using it?
        setDescription(updatedFields.description);
        setPriority(updatedFields.priority);
        setShowDetails(false); //Closes edit card.
    }

    return (
        <div className="mb-[2em]">
            <form className="flex h-10 mx-auto my-0 justify-center w-5/6">
                <div className="h-base w-20 bg-red-600 border-2 border-black"></div>
                <input className="border-2 border-black w-md" type="text" placeholder="Add a new todo..." name="task" value={task} onChange={(e) => setTask(e.target.value)}/>
                <select className="border-2 border-black" name="category" onChange={(e) => setCategory(e.target.value)}>
                    <option value="Other">Other</option>
                    <option value="Personal">Personal</option>
                    <option value="Career">Career</option>
                    <option value="Education">Education</option>
                </select>
                <input type="date" className="border-2 border-black" value={date} onChange={(e) => setDate(e.target.value)} text-black></input>
                <input className="border-2 border-black w-3xs cursor-pointer" type="button" value="EDIT" onClick={() => setShowDetails(true)}></input>
                <input className="border-2 border-black w-3xs cursor-pointer" type="button" value="ADD" onClick={addButton}/>
            </form>
            {error && <ErrorCard />}
            {showDetails && (
                <EditCard
                    todo={{task, category, date, description, priority}}
                    onSave={saveDraftDetails}
                    setEdit={() => setShowDetails(false)}
                />
            )}
        </div>
    );
}

export default TaskEntry;