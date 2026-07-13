import { useState } from "react";

function TaskOutput(props) {
    
    return (
        <div class="flex h-10 mx-auto my-0 justify-center w-5/6">
            <div class="h-base w-20 bg-green-600 border-2 border-black-200"></div>
            <p class="border-2 border-black-200 w-md">{"task" in props.data ? props.data["task"] : "No Data to display"}</p>
            <p class="border-2 border-black-200 w-s">{"category" in props.data ? props.data["category"] : "No Data to display"}</p>
            <p class="border-2 border-black-200 w-3xs">{"date" in props.data ? props.data["date"] : "No Data to display"}</p>
            <input class="border-2 border-black-200 w-2xs cursor-pointer" type="button" value="DELETE"/>
        </div>
    );
}

export default TaskOutput;