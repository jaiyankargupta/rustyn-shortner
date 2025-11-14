import React from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config/api.config.js";

const Signup = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up.");
      }
      navigate("/signin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-xl shadow-lg min-w-[320px] w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center mb-6 text-2xl font-bold text-gray-800">
          Sign Up
        </h1>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-center">
            {error}
          </div>
        )}
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-gray-600 font-semibold"
          >
            Name:
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            autoComplete="name"
            placeholder="Enter your name"
            type="text"
            name="name"
            required
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-gray-600 font-semibold">
            Email:
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            autoComplete="email"
            placeholder="Enter your email"
            type="email"
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
            id="password"
            autoComplete="new-password"
            placeholder="Enter your password"
            type="password"
            name="password"
            required
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-bold text-lg transition-colors"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
