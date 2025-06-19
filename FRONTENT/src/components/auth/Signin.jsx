import React from "react";

import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      setError(data.message || "Login failed. Please try again.");
    } else {
      setError("");
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-xl shadow-lg min-w-[320px] w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center mb-6 text-2xl font-bold text-gray-800">
          Sign In
        </h1>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
            {error}
          </div>
        )}
        <div className="mb-5">
          <label className="block mb-2 text-gray-600 font-semibold">
            Email:
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            required
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-gray-600 font-semibold">
            Password:
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            required
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-bold text-lg transition-colors"
        >
          {loading ? "Signing In... " : "Sign In"}
        </button>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signin;
