import type { FC } from "react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-gray-900 text-white rounded-xl p-6 w-[90%] max-w-xl shadow-2xl relative">
        <button
          className="absolute top-3 right-3 text-gray-300 hover:text-red-400 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">About Clevora</h2>
        <p className="text-white/80 leading-relaxed text-sm">
          <strong>Clevora</strong> is your smart digital assistant for productivity and event
          planning. Designed for individuals and teams, Clevora combines an elegant
          calendar interface with powerful task management and real-time collaboration
          tools. Our mission is to simplify your digital life and keep your plans
          on track — all in one place.
        </p>
        <p className="mt-4 text-white/70 text-xs">
          © 2025 Clevora. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AboutModal;
