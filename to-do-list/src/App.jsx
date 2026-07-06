import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
    <div class="flex justify-evenly h-15 w-full mt-[1em] mb-[200px] mx-auto my-0 bg-blue-200 border-2 border-black-200 items-center">
      <button class="rounded-full padding-[2em] bg-blue-100 text-black">Button1</button>
      <button class="rounded-full padding-[2em] bg-blue-100 text-black">Button2</button>
      <p class="decoration-solid ">TO-DO NUMBER</p>
      <button class="rounded-full padding-[2em] bg-blue-100 text-black">Button3</button>
      <button class="rounded-full padding-[2em] bg-blue-100 text-black">Button4</button>
    </div>

    <div class="flex h-10 mx-auto my-0 justify-evenly">
      <div class="h-base w-20 bg-red-600 border-2 border-black-200"></div>
      <input class="flex border-2 border-black-200 w-md" type="text" placeholder="Add a new todo..." />
    </div>
    
    </>
  )
}

export default App
