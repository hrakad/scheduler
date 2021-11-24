import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(mode) {
    //console.log(mode)
    setMode(mode);

    setHistory(() => {
      history.push(mode);
      return history;
    });
    //console.log(history)
  }

  function back() {
    history.pop();
    setMode(history[history.length - 1]);
  }

  return { mode, transition, back };
}
