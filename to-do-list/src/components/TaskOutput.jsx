import { useState } from "react";
import EditCard from "./EditCard";

function TaskOutput(props) {
    const [edit, setEdit]= useState(false);
    const categoryMap = new Map();

    categoryMap.set("Personal", 'bg-green-600');
    categoryMap.set("Career", 'bg-purple-600');
    categoryMap.set("Other", 'bg-blue-600');
    categoryMap.set("Education", 'bg-amber-50');

    return (
        <div className="flex h-10 mx-auto my-0 justify-center w-5/6 pb-2">
            <div className= {`h-base w-20 border-2 border-black ${categoryMap.get(props.data.category)}`}></div>
            <p className="border-2 border-black w-md">{props.data.task}</p>
            <p className="border-2 border-black w-s">{props.data.category}</p>
            <p className="border-2 border-black w-3xs">{props.data.date.split("-").reverse().join("/")}</p>
            <input className="border-2 border-black w-3xs cursor-pointer" type="button" value="EDIT" onClick={() => setEdit(true)}></input>
            <input className="border-2 border-black w-3xs cursor-pointer" type="button" value="DELETE" onClick={() => props.onDelete(props.data.id)}/>
            {edit && <EditCard setEdit={setEdit} todo={props.data} onSave={props.onEditClick} />}
        </div>
    );
}

export default TaskOutput;