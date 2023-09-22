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
  position: string;
  removeToast: (id: number) => void;
}

const ToastList: React.FC<ToastListProps> = ({ data, position, removeToast }) => {
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Add any necessary logic here if needed
  }, []);

  // Conditionally render the toast list based on data length
  const toastList = data.map((toast) => {
    // Check if toast.type is valid before rendering
    if (["ghost", "magic", "comment"].includes(toast.type)) {
      return (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      );
    } else {
      // Handle invalid toast types here, e.g., log an error
      console.error(`Invalid toast type: ${toast.type}`);
      return null; // Skip rendering the invalid toast
    }
  });

  return (
    <div
      className={`toast-list toast-list--${position}`}
      aria-live="assertive"
      ref={listRef}
    >
      {toastList}
    </div>
  );
};

export default ToastList;
