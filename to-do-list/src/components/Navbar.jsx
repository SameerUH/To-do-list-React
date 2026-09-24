import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import App from '../App';
import Pomodoro from '../Pomodoro';
import Settings from '../Settings';

function Navbar() {
    return (
        <BrowserRouter>
            <div className="flex justify-evenly h-15 w-full mt-[1em] mb-50 mx-auto my-0 bg-blue-200 border-2 border-black items-center">
                <Link className="rounded-full padding-[2em] bg-blue-100 text-black" to="/">Todos</Link>
                <Link className="rounded-full padding-[2em] bg-blue-100 text-black" to="/pomodoro">Pomodoro</Link>
                <button className="rounded-full padding-[2em] bg-blue-100 text-black">Button3</button>
                <Link className="rounded-full padding-[2em] bg-blue-100 text-black" to="/settings">Settings</Link>
            </div>

            <Routes>
                <Route path="/" element={<App />}/>
                <Route path="/pomodoro" element={<Pomodoro />}/>
                <Route path="/settings" element={<Settings />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Navbar;