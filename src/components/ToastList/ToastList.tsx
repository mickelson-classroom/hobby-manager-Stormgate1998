import React, { useRef, useEffect, useCallback } from "react";
import Toast from "../Toaster/Toast";
import { ToastObj } from "../Toaster/Toast";

interface ToastListProps {
  data: ToastObj[];
  position: string; // You can specify a more specific type if needed
  removeToast: (id: string) => void; // Assuming removeToast takes an id parameter
}

const ToastList: React.FC<ToastListProps> = ({ data, position, removeToast }) => {
  const listRef = useRef<HTMLDivElement | null>(null); // Specify the useRef type

  const handleScrolling = useCallback((el: HTMLDivElement | null) => {
  const isTopPosition = ["top-left", "top-right"].includes(position);
  if (isTopPosition) {
    el?.scrollTo(0, el.scrollHeight);
  } else {
    el?.scrollTo(0, 0);
  }
}, [position]);

  useEffect(() => {
    handleScrolling(listRef.current);
  }, [position, data,  handleScrolling]);

  const sortedData = position.includes("bottom")
    ? [...data].reverse()
    : [...data];
  
  return (
    <>
    {data.length > 0 && (
      <div
        className={`toast-list toast-list--${position}`}
        aria-live="assertive"
        ref={listRef}
      >
        {sortedData.map((toast) => (
          <Toast
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    )}
    </>
  );
  
};

export default ToastList;
