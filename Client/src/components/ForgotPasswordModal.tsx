import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("❌ " + (data.message || "Something went wrong"));
      } else {
        setStatus("✅ Reset link sent to your email!");
        setEmail("");
      }
    } catch (err) {
      setStatus("❌ Failed to send request");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md text-white relative">
        <button
          className="absolute top-2 right-2 text-white text-xl z-50 p-1 hover:bg-yellow-600 transition"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white"
          />
          <button
            type="submit"
            className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded"
          >
            Send Reset Link
          </button>
        </form>

        {status && <p className="text-sm mt-3 text-center">{status}</p>}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
