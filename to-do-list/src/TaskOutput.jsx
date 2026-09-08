import { useState } from "react";

function TaskOutput(props) {
    const categoryMap = new Map();

    categoryMap.set("Personal", 'bg-green-600');
    categoryMap.set("Career", 'bg-slate-50');
    categoryMap.set("Other", 'bg-blue-600');
    categoryMap.set("Education", 'bg-amber-50');

    return (
        <div className="flex h-10 mx-auto my-0 justify-center w-5/6 pb-2">
            <div className= {`h-base w-20 border-2 border-black-200 ${categoryMap.get(props.data.category)}`}></div>
            <p className="border-2 border-black-200 w-md">{props.data.task}</p>
            <p className="border-2 border-black-200 w-s">{props.data.category}</p>
            <p className="border-2 border-black-200 w-3xs">{props.data.date.split("-").reverse().join("/")}</p>
            <input 
                className="border-2 border-black-200 w-2xs cursor-pointer" 
                type="button" 
                value="DELETE" 
                onClick={() => props.onDelete(props.data.id)}
            />
        </div>
    );
}

export default TaskOutput;