import React, { useState } from "react";
import Toast from "../components/Toaster/Toast"
import ToastList from "../components/ToastList/ToastList";
import Navbar from "./NavBar";
interface Toast {
  id: number;
  message: string;
  type: "ghost" | "magic" | "comment";
}

export const ToastPage = () => {
  const [toasts, setToasts] = useState<Toast[]>([]); // Explicitly type the state as an array of Toast objects
  const [autoClose, setAutoClose] = useState(true);
  const [autoCloseDuration, setAutoCloseDuration] = useState(5);
  const [position, setPosition] = useState("bottom-right");

  const showToast = (message: string, type: "ghost" | "magic" | "comment") => {
    const toast: Toast = {
      id: Date.now(),
      message,
      type,
    };

    setToasts((prevToasts) => [...prevToasts, toast]);
    
    if (autoClose) {
      setTimeout(() => {
        removeToast(toast.id);
      }, autoCloseDuration * 1000);
    }
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const removeAllToasts = () => {
    setToasts([]);
  };

  const handleAutoCloseChange = () => {
    setAutoClose((prevAutoClose) => !prevAutoClose);
    removeAllToasts();
  };
  const generateFiftyToasts = () => {
    for(var i=0; i < 50; i++ ){
      showToast("Message " + i, "magic")
    }
  }
  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutoCloseDuration(Number(event.target.value));
  };

  const handlePositionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPosition(event.target.value);
  };

  return (
      <div className="app">
        <Navbar/>
      <h1 className="app-title">React Toast Component</h1>

      <div className="app-row app-row--group">
        <button className="btn btn-primary m-3 button-hover-animation" onClick={() => showToast("A ghost message", "ghost")}>
          Show Ghost Toast
        </button>
        <button className="btn btn-primary m-3 button-hover-animation" onClick={() => showToast("A magic message", "magic")}>
          Show Magic Toast
        </button>
        <button className="btn btn-primary m-3 button-hover-animation" onClick={() => showToast("A comment message", "comment")}>
          Show Comment Toast
        </button>
        <button className="btn btn-primary m-3 button-hover-animation" onClick={removeAllToasts}>Clear Toasts</button>
        <button className="btn btn-primary m-3 button-hover-animation" onClick={generateFiftyToasts}>Create Fifty Toasts</button>
      </div>

      <div className="app-row m-3 ">
        <input
          id="toggleDuration"
          type="checkbox"
          checked={autoClose}
          onChange={handleAutoCloseChange}
          className=""
        />
        <label htmlFor="toggleDuration" className="m-2">Auto-dismiss?</label>
      </div>

      <div className="app-row m-3 ">
        <label htmlFor="duration">Duration (seconds)</label>
        <input
          id="duration"
          type="number"
          min="1"
          max="5"
          value={autoCloseDuration}
          onChange={handleDurationChange}
          disabled={!autoClose}
          className="form-control"
        />
      </div>

      <ToastList data={toasts} position={position} removeToast={removeToast} />
    </div>
  );
};
