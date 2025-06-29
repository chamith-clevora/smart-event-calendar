import React from "react";
import CalendarView from "../pages/Calendar"; 

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  window?: boolean;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="relative">
        <button
    onClick={onClose}
    className="absolute top-[7%] right-[21.5%] text-white text-xl z-50 p-1 hover:bg-yellow-600 transition"
  >
    &times;
    
  </button>
        <CalendarView />
      </div>
    </div>
  );
};

export default CalendarModal;
