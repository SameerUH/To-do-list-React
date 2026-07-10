import { useState } from "react";

function TaskEntry(props) {
    const [task, setTask] = useState("");

    const addButton = () => {
        props.callback({task: task});
    };

    return (
        <div>
            <form class="flex h-10 mx-auto my-0 justify-evenly">
            <div class="h-base w-20 bg-red-600 border-2 border-black-200"></div>
            <input class="border-2 border-black-200 w-md" type="text" placeholder="Add a new todo..." name="task" value={task} onChange={(e) => setTask(e.target.value)}/>
            <input class="border-2 border-black-200 w-xs cursor-pointer" type="button" value="ADD" onClick={addButton}/>
            </form>

            <p>{task}</p>
        </div>
    );
}

export default TaskEntry;