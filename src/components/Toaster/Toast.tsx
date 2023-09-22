import "/Toast.css"
import React from "react"
import {
  GhostIcon,
  CommentIcon,
  MagicIcon,
  CloseIcon
} from "../Icons/Icons";
import "/Toast.css"

// Define the props type
type ToastProps = {
  message: string;
  type: 'ghost' | 'magic' | 'comment';
  onClose: () => void;
};

// Create the Toast component
const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  // Define the icon mapping
  const iconMap: Record<string, React.ReactNode> = {
    success: <MagicIcon />,
    failure: <GhostIcon />,
    warning: <CommentIcon />,
  };

  // Get the corresponding icon or null if not found
  const toastIcon = iconMap[type] || null;

  return (
     <div className={`toast toast--${type}`} role="alert">
      <div className="toast-message">
        {toastIcon && (
          <div className="icon icon--lg icon--thumb">{toastIcon}</div>
        )}
        <p>{message}</p>
      </div>
      <button className="toast-close-btn" onClick={onClose}>
        <span className="icon">
          <CloseIcon />
        </span>
      </button>
    </div>
  );
};

export default Toast;


