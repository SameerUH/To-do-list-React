import { useState } from "react";

function TaskOutput(props) {
    return (
        <div className="flex h-10 mx-auto my-0 justify-center w-5/6">
            <div className="h-base w-20 bg-green-600 border-2 border-black-200"></div>
            <p className="border-2 border-black-200 w-md">{props.data.task}</p>
            <p className="border-2 border-black-200 w-s">{props.data.category}</p>
            <p className="border-2 border-black-200 w-3xs">{props.data.date}</p>
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