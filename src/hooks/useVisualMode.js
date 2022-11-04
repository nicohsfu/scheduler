import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    const historyClone = [...history];

    if (!replace) {
      historyClone.push(mode);
      setHistory(historyClone);
      setMode(mode);
    }

    historyClone[historyClone.length - 1] = mode;
    setHistory(historyClone);
    setMode(historyClone[historyClone.length - 1]);
  };

  const back = () => {
    if (history.length > 1) {
      const historyClone = [...history];
      historyClone.pop(); // removes last item in arr
      setHistory(historyClone);
      setMode(historyClone[historyClone.length - 1]);
    }
  };

  return { mode, history, transition, back };
}