import React, { useState } from "react";

interface LoginProps {
  onClose: () => void;
  onSwitch: (target: "signup" | "forgot") => void;
}

const Login: React.FC<LoginProps> = ({ onClose, onSwitch }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
      } else {
        localStorage.setItem("clevoraUser", JSON.stringify({ email: formData.email }));
        localStorage.setItem("isLoggedIn", "true");
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (err) {
      setError("Failed to connect to server");
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md text-white relative">
      
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-white text-xl z-50 p-1 hover:bg-yellow-600 transition"
      >
        ×
      </button>

      <h2 className="text-3xl font-bold mb-6 text-center">Login to Clevora</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white"
        />
        <button
          type="submit"
          className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded"
        >
          Login
        </button>
      </form>

      <div className="mt-4 text-center text-red-500">{error}</div>
      <div className="mt-4 text-center text-green-400">{success}</div>

      <div className="flex justify-between mt-4 text-sm text-white/80">
        <button
          onClick={() => onSwitch("forgot")}
          className="hover:underline bg-transparent border-transparent"
        >
          Forgot Password?
        </button>
        <button
          onClick={() => onSwitch("signup")}
          className="hover:underline bg-transparent border-transparent"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
