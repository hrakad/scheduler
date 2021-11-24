import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(mode, replace) {
    if (!replace) {
      setMode(mode);

      setHistory(() => {
        history.push(mode);
        return history;
      });
    } else {
      history.pop();
      history.push(mode);
      setMode(history[history.length - 1]);
    }
  }

  function back(mode) {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }

  }

  return { mode, transition, back };
}