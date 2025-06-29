import React from "react";

interface IntroductionProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const Introduction: React.FC<IntroductionProps> = ({ onLoginClick, onSignupClick }) => {
  return (
    <div className="flex justify-center mt-[10%] bg-gradient-to-br from-orange-400/40 to-purple-600/40 backdrop-blur-lg p-8 rounded-2xl w-full max-w-2xl mx-auto">
      
      {/* Centered Content */}
      <div className="w-full text-center flex flex-col items-center">
        <h3 className="text-2xl font-semibold text-white mb-4">Welcome to Clevora</h3>
        <p className="text-white/90 text-base leading-relaxed mb-6 max-w-md">
          Clevora is your smart companion to plan, organize, and manage all your events effortlessly. Whether you're working solo or collaborating with a team, our intuitive platform helps you stay on track and in control — always.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onLoginClick}
            className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded shadow-md transition-all duration-300"
          >
            Get Started
          </button>

          <button
            onClick={onSignupClick}
            className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded shadow-md transition-all duration-300"
          >
            Sign Up
          </button>
        </div>

        {/* Info Paragraph */}
        <p className="mt-6 text-sm text-white/70 max-w-md">
          New to Clevora? <span className="text-white font-medium">Create your account now</span> and start organizing your life — the smart way.
        </p>
      </div>
    </div>
  );
};

export default Introduction;
