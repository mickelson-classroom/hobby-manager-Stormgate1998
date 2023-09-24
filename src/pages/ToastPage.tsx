import React, { useState } from "react";
import Toast from "../components/Toaster/Toast"
import ToastList from "../components/ToastList/ToastList";
import "../components/Toaster/Toast.css"
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
        <button className="btn btn-primary" onClick={() => showToast("A ghost message", "ghost")}>
          Show Ghost Toast
        </button>
        <button className="btn btn-primary" onClick={() => showToast("A magic message", "magic")}>
          Show Magic Toast
        </button>
        <button className="btn btn-primary" onClick={() => showToast("A comment message", "comment")}>
          Show Comment Toast
        </button>
        <button className="btn btn-primary" onClick={removeAllToasts}>Clear Toasts</button>
        <button className="btn btn-primary" onClick={generateFiftyToasts}>Create Fifty Toasts</button>
      </div>

      <div className="app-row">
        <input
          id="toggleDuration"
          type="checkbox"
          checked={autoClose}
          onChange={handleAutoCloseChange}
        />
        <label htmlFor="toggleDuration">Auto-dismiss?</label>
      </div>

      <div className="app-row">
        <label htmlFor="duration">Duration (seconds)</label>
        <input
          id="duration"
          type="number"
          min="1"
          max="5"
          value={autoCloseDuration}
          onChange={handleDurationChange}
          disabled={!autoClose}
        />
      </div>

      <div className="app-row">
        <label htmlFor="position">Position</label>
        <select
          id="position"
          value={position}
          onChange={handlePositionChange}
        >
          <option value="top-right">Top-right</option>
          <option value="top-left">Top-left</option>
          <option value="bottom-right">Bottom-right</option>
          <option value="bottom-left">Bottom-left</option>
        </select>
      </div>

      <ToastList data={toasts} position={position} removeToast={removeToast} />
    </div>
  );
};
