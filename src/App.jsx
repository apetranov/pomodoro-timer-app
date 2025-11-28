import { useEffect, useState } from "react";
import "./App.css"

export default function Pomodoro() {
  // durations (in seconds)
  const FOCUS_TIME = 25 * 60;
  const SHORT_BREAK = 5 * 60;

  // States
  const [mode, setMode] = useState("study"); // "focus" | "short" | "long"
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false); // auto-start on load
  // const [cycles, setCycles] = useState(0); // counts completed focus sessions

  // TIMER EFFECT
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t > 0) return t - 1;

        // time reached zero → bell rings
        const bell = new Audio("/bell.mp3");
        bell.play();
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode]);
  
  
  function shortBreak() {
    setMode("break");
    setTimeLeft(SHORT_BREAK);
    setIsRunning(false);
  }

  function study() {
      setMode("study");
      setTimeLeft(FOCUS_TIME);
      setIsRunning(false);
  }

  function resetStudy() {
    setMode("study");
    setTimeLeft(FOCUS_TIME);
    setIsRunning(false);
    // setCycles(0);
  }

  function resetShortBreak() {
    setMode("break");
    setTimeLeft(SHORT_BREAK);
    setIsRunning(false);
    // setCycles(0);
  }

  // TIME FORMATTER
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="space-y-5 flex flex-col justify-center items-center h-screen">
      <div>
        {mode === "study" ? <div className="text-7xl md:text-9xl text-purple-600 font-bold">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </div> : <div className="text-7xl md:text-9xl text-orange-400 font-bold">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </div>}
      </div>
      

      <div className="flex flex-col justify-center items-center md:flex-row gap-2">
        {/* <button className="bg-green-400 text-white font-semibold px-5 py-1 rounded-full" onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Pause" : "Start"}
        </button> */}
        {isRunning ? <button className="bg-red-400 text-white font-semibold px-9 py-3 rounded-full" onClick={() => setIsRunning(!isRunning)}>
          Pause
        </button> : <button className="bg-green-400 text-white font-semibold px-9 py-3 rounded-full" onClick={() => setIsRunning(!isRunning)}>
          Start
        </button>}

        {mode === "break" ? <button className="bg-blue-400 text-white font-semibold px-9 py-3 rounded-full" onClick={resetShortBreak}>Reset</button> : 
        <button className="bg-blue-400 text-white font-semibold px-9 py-3 rounded-full" onClick={resetStudy}>Reset</button>}
        
        <button className="bg-orange-400 text-white font-semibold px-9 py-3 rounded-full" onClick={shortBreak}>Break</button>
        <button className="bg-purple-600 text-white font-semibold px-9 py-3 rounded-full" onClick={study}>Study</button>
        </div>
    </div>
  );
}
