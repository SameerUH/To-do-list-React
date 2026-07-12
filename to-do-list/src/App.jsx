import { useState } from 'react';
import './App.css';
import TaskEntry from './TaskEntry';


function App() {
    const [data, setData] = useState({});
    
    const updateData = (taskParams) => {
      setData(taskParams);
  };
  
  return (
    <>
    <div class="flex justify-evenly h-15 w-full mt-[1em] mb-[200px] mx-auto my-0 bg-blue-200 border-2 border-black-200 items-center">
      <button class="rounded-full padding-[2em] bg-blue-100 text-black">Button1</button>
      <button class="rounded-full padding-[2em] bg-blue-100 text-black">Button2</button>
      <p class="decoration-solid ">TO-DO NUMBER</p>
      <button class="rounded-full padding-[2em] bg-blue-100 text-black">Button3</button>
      <button class="rounded-full padding-[2em] bg-blue-100 text-black">Button4</button>
    </div>

    <TaskEntry callback={updateData}/>
    <p>{"task" in data ? data["task"] : "No Data to display"}</p>
    <p>{"category" in data ? data["category"] : "No Data to display"}</p>
    <p>{"date" in data ? data["date"] : "No Data to display"}</p>
    </>
  )
}

export default App
