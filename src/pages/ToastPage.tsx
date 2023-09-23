import React, { useState } from "react";
import Toast from "../components/Toaster/Toast"
import ToastList from "../components/ToastList/ToastList";
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

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutoCloseDuration(Number(event.target.value));
  };

  const handlePositionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPosition(event.target.value);
  };

  return (
      <div className="app">
      <h1 className="app-title">React Toast Component</h1>

      <div className="app-row app-row--group">
        <button onClick={() => showToast("A success message", "ghost")}>
          Show Success Toast
        </button>
        <button onClick={() => showToast("A failure message", "magic")}>
          Show Error Toast
        </button>
        <button onClick={() => showToast("A warning message", "comment")}>
          Show Warning Toast
        </button>
        <button onClick={removeAllToasts}>Clear Toasts</button>
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
