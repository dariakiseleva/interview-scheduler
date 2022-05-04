
import { useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);

  //History array is a stack of modes 
  //New ones are added to the end on transition, or removed from the end on back
  const [history, setHistory] = useState([initial]);

  //Transition to a new mode
  const transition = (newMode, replace = false) => {
    const newHistory = [...history]

    //If using replacement, remove previous history item
    if (replace) newHistory.pop() 

    newHistory.push(newMode)
    setHistory(newHistory);
    setMode(newMode)
  }
  
  //Go back to the previous mode
  const back = () => {
    //Only do if this not the only mode in history
    if (history.length >= 2){
      const newHistory = [...history]
      newHistory.pop()
      const prevMode = newHistory[newHistory.length-1];
      setHistory(newHistory)
      setMode(prevMode);
    }
  }

  //Return the mode variable and functions to transition or go back
  return { 
    mode,
    transition,
    back
  };
}
