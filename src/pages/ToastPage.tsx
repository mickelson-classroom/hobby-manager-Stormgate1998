import React, { useState } from "react";
import Toast from "../components/Toaster/Toast"
import ToastList from "../components/ToastList/ToastList";
import Navbar from "./NavBar";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { addToast, removeAllToasts, removeToast } from "../features/toast-slice";
import { ToastObj } from "../components/Toaster/Toast";
export const ToastPage = () => {
  const toasts = useAppSelector((state) => state.toast)
 const dispatch = useAppDispatch();
  // Explicitly type the state as an array of Toast objects
  const [autoClose, setAutoClose] = useState(true);
  const [autoCloseDuration, setAutoCloseDuration] = useState(5);
  const [position, setPosition] = useState("bottom-right");

  const showToast = (message: string, type: "ghost" | "magic" | "comment") => {
    const toast: ToastObj = {
      id: Date.now().toString(),
      message,
      type,
    };

    dispatch(addToast(toast));
    
    if (autoClose) {
      setTimeout(() => {
        removeCertainToast(toast.id);
      }, autoCloseDuration * 1000);
    }
  };

  const removeCertainToast = (id: string) => {
    dispatch(removeToast(id))
  };

  const removeAllToast = () => {
   dispatch(removeAllToasts());
  };

  const handleAutoCloseChange = () => {
    setAutoClose((prevAutoClose) => !prevAutoClose);
    removeAllToast();
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
      <div className="app-container">
        {/* Navbar */}
        <Navbar />

        <div className="app-content">
          <h1 className="app-title">Toast Component</h1>


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
        <button className="btn btn-primary m-3 button-hover-animation" onClick={removeAllToast}>Clear Toasts</button>
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
            <label htmlFor="toggleDuration" className="m-2">
              Auto-dismiss?
            </label>
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
 <ToastList data={toasts.toasts} position={position} removeToast={removeCertainToast} />
        </div>
      </div>
    </div>
  );
};