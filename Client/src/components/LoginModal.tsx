
import React from "react";
import Login from "../pages/Login";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: (target: "signup" | "forgot") => void; 
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitch }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="relative">
        

        {/* Pass modal control functions */}
         <Login onClose={onClose} onSwitch={onSwitch}/>
      </div>
    </div>
  );
};

export default LoginModal;
