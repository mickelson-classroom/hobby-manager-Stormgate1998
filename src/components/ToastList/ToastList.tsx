import React, { useRef, useEffect } from "react";
import Toast from "../Toaster/Toast";
import "./ToastList.css";

interface ToastData {
  id: number;
  message: string;
  type: "ghost" | "magic" | "comment";
}

interface ToastListProps {
  data: ToastData[];
  position: string; // You can specify a more specific type if needed
  removeToast: (id: number) => void; // Assuming removeToast takes an id parameter
}

const ToastList: React.FC<ToastListProps> = ({ data, position, removeToast }) => {
  const listRef = useRef<HTMLDivElement | null>(null); // Specify the useRef type

  const handleScrolling = (el: HTMLDivElement | null) => { // Specify the parameter type
    const isTopPosition = ["top-left", "top-right"].includes(position);
    if (isTopPosition) {
      el?.scrollTo(0, el.scrollHeight);
    } else {
      el?.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    handleScrolling(listRef.current);
  }, [position, data]);

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
            key={toast.id}
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
