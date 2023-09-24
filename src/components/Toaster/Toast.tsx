
import React from "react"
import {
  GhostIcon,
  CommentIcon,
  MagicIcon,
  CloseIcon
} from "../Icons/Icons";
// Define the props type
export interface ToastProps {
  message: string;
  type: 'ghost' | 'magic' | 'comment';
  onClose: () => void;
};

// Create the Toast component
const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  // Define the icon mapping
  const iconMap: Record<string, React.ReactNode> = {
    ghost: <GhostIcon />,
    magic: <MagicIcon />,
    comment: <CommentIcon />,
  };

  // Get the corresponding icon or null if not found
  const toastIcon = iconMap[type] || null;

  return (
     <div className={`toast toast--${type} show`} role="alert">
      <div className="toast-message">
        {toastIcon && (
          <div className="icon icon--lg icon--thumb style={{ width: '20px', height: '20px' }}">{toastIcon}</div>
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


