import React, { useState } from "react";

interface signupProps {
  onClose: () => void;
  onSwitch: (target: "Login" ) => void;
}


const Signup: React.FC<signupProps> = ({ onClose, onSwitch }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for feedback
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
      } else {
        setSuccess("Signup successful! You can now login.");
        // Optionally clear form or close modal here
      }
    } catch (err) {
      setError("Failed to connect to server");
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">SignUp to Clevora</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="User Name"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-white/10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white"
          required
        />

        <button
          type="submit"
          className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded"
        >
          Sign Up
        </button>
      </form>
      <div className="mt-4 text-center text-red-500">{error}</div>
      <div className="mt-4 text-center text-green-400">{success}</div>
      <div className="flex justify-between mt-4 text-sm text-white/80">
        <button
          onClick={() => onSwitch("Login")}
          className="hover:underline bg-transparent border-transparent"
        >
          Already have an Account ?
        </button>
      </div>
    </div>
  );
};

export default Signup;
