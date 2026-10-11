import { useState } from 'react';
import logo from './assets/settings.png'

console.log(logo);

function Settings({bgcolour, setbgcolour, fontcolour, setfontcolour}) {

    return (
    <>
        <img className="flex justify-center w-1/8 self-center" src={logo} alt="Settings logo" />
        <h1 className="underline">Settings page</h1>

        <div>
            <div className='flex justify-center mx-auto my-0 border-black w-1/2'>
                <p className='border-black p-5 border-2 text-lg font-medium'>Change background colour: </p>
                <input type='color' value={bgcolour} onChange={(e) => setbgcolour(e.target.value)} className='w-20 h-20 border-black border-2 cursor-pointer'/>
            </div>

             <div className='flex justify-center mx-auto my-0 border-black w-1/2'>
                <p className='border-black p-5 border-2 text-lg font-medium'>Change font colour: </p>
                <input type='color' value={fontcolour} onChange={(e) => setfontcolour(e.target.value)} className='w-20 h-20 border-black border-2 cursor-pointer'/>
            </div>
        </div>
    </>
    );
}

export default Settings;