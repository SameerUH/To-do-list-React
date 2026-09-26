import { useState, useRef, useEffect } from "react";

function ProgressBar({duration}) {
    const [progress, setProgress] = useState(100); //Sets progress bar to 100%

    useEffect(() => {
        const interval = 10;
        const increment = (100/duration) * interval;

        const timer = setInterval(() => { //Increments down to 0
            setProgress((prev) => {
                if (prev <= 0){
                    clearInterval(timer);
                    return 0;
                }
                return prev - increment;
            });
        }, interval);
        return () => clearInterval(timer);
    }, [duration]);

    const getColor = (value) => {
        var color = "255";
        if (value < 50) {
            color = "0";
        }
        return `rgb(${color}, ${color}, ${color})`; //Changes color of text to black when it reaches 50%
    };

    return (
        <div className="relative flex w-1/2 h-6 bg-gray-300 rounded-full overflow-hidden border-2 border-black mx-auto">
            <div className="h-full bg-blue-500 transition-all justify-center" style={{width: `${progress}%`}}></div>
            <span className="absolute inset-0 flex items-center justify-center text-sm" style={{color: getColor(progress)}}>{`${Math.round(progress)}%`}</span>
        </div>
    );
}


function Pomodoro() {
    const Ref = useRef(null); //References a value that's not needed for rendering.

    const [timer, setTimer] = useState("");

    const [timeLeft, setTimeLeft] = useState("0");
    const [isActive, setIsActive] = useState(false);
    const [progressDone, setProgressDone] = useState(false);

    var customTimeSeconds = timer * 60;

    useEffect(() => {
        let currenttimer;

        if(isActive && timeLeft > 0){ //Checks if the timer is still running.
            currenttimer = setTimeout(() =>{
                setTimeLeft((prevTime) => prevTime - 1); //Counts down if so.
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            setProgressDone(true);
        }
        return () => clearTimeout(currenttimer);
    }, [timeLeft, isActive]);

    var minutes = Math.floor(timeLeft / 60);
    var seconds = timeLeft - minutes * 60;

    if (seconds < 10){
        seconds = "0"+seconds;
    }

    const handleInputChange = (event) => {
        setTimer(Ref.current.value); //Sets the timer to the input.
    }

    const handleButtonClick = () => {
        setTimeLeft(customTimeSeconds);
        setIsActive(true);
        setProgressDone(false);
    }


    return (
        <>
        <h1>Pomodoro timer page:</h1>

        <div className="text-center mt-20px">
            <div><input className="border-black border-2 text-center mb-5 mx-auto" type="number" ref={Ref} onChange={handleInputChange} value={timer} placeholder="Enter time in minutes"></input></div>
            <button className="border-black border-2 rounded-2xl p-1 mb-5 bg-green-400 font-bold" onClick={handleButtonClick}>
                {isActive ? "Counting down...": "Start timer"} {/* Shorthand if statement which checks if timer is active or not, if it is, it selects the first option.*/}
            </button>

            <div className="flex justify-center rounded-lg p-4 border-black border-2 w-1/2 mx-auto my-0 text-center mb-5 text-4xl bg-white font-bold">
                    {`${minutes}:${seconds}`}
            </div>
            
                {isActive ? 
                    <ProgressBar duration={customTimeSeconds * 1000} /> :
                    ""
                } {/*Displays the progress bar.*/}
        </div>
        </>

        

    );
}

export default Pomodoro;