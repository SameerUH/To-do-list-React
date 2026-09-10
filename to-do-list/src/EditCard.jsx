import { useState, useEffect } from 'react';

function EditCard( {edit, setEdit} ) {
    return (
        <div className="flex absolute inset-0 backdrop-blur-xl h-full w-full justify-center">
            <div className="h-20 w-100 border-2 p-2 border-white rounded-md shadow-2xs self-center z-10 bg-(--bg)">
                <h2>Click okay button to exit this.</h2>
                <input className="border-2 border-black w-3xs cursor-pointer" type="button" value="Okay" onClick={() => setEdit(false)}></input>
            </div>
        </div>
    );
}

export default EditCard;