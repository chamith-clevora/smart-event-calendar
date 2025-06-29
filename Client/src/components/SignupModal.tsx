import React from "react";
import Signup from "../pages/Signup";

interface SignupModalProps {
     isOpen: boolean;
     onClose: () => void;
     onSwitch: (target: "Login" ) => void;

}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, onSwitch }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl z-50 p-1 hover:bg-yellow-600 transition"
        >
          &times;
        </button>
        <Signup onClose={onClose} onSwitch={onSwitch} />
      </div>
    </div>
  );
};

export default SignupModal;
