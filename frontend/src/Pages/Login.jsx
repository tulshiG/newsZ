
// Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

/**
 * Login component for user authentication.
 * It provides a form for users to sign in with their email and password.
 * The form handles submission to the Flask backend and redirects on success.
 */
export function Login() {
  // State variables for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  // State for feedback messages and their type (success/error)
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission for login
  const handleLogin = async (e) => {
    e.preventDefault();
    // Clear previous messages
    setMessage("");
    setMessageType("");
    // localStorage.setItem("userEmail", email);
    try {
      // Send a POST request to the Flask backend
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setMessageType("success");
        // Clear form fields on successful login
        setEmail("");
        setPassword("");
        // Redirect to the home page after successful login
        
        localStorage.setItem("userEmail", email);
        window.dispatchEvent(new Event("storage"));

         navigate("/");
      } else {
        setMessage(data.message);
        setMessageType("error");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setMessage("An error occurred. Please try again later.");
      setMessageType("error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1A1A2E] text-gray-200 p-4 font-sans">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-[#1F2036] border border-[#2B2C40] transform transition-transform duration-300 hover:scale-[1.01]">
        <div className="flex flex-col items-center mb-8">
          {/* SVG for NewsHub Logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 mb-2 text-[#6A5ACD] transform transition-transform duration-300 hover:rotate-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <path d="M14 2v6h6"></path>
            <path d="M8 12h8"></path>
            <path d="M8 16h8"></path>
            <path d="M12 20h4"></path>
          </svg>
          <h1 className="text-3xl font-bold text-white">NewsZ</h1>
        </div>
        <h2 className="text-2xl font-semibold text-center text-white mb-2">Login</h2>
        <p className="text-center text-gray-400 mb-6">
          Login to access your personalized news feed
        </p>

        {/* Message box for feedback */}
        {message && (
          <div
            className={`p-3 mb-4 rounded-lg text-sm transition-opacity duration-500 ${
              messageType === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {message}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Email Address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                type="email"
                className="block w-full pl-10 pr-3 py-2 border border-[#2B2C40] rounded-lg bg-[#2B2C40] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A5ACD] focus:border-transparent transition-colors"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400">
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 016 0v2h2V7a5 5 0 10-10 0v2h1a2 2 0 002-2V7a3 3 0 013-3z" />
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="block w-full pl-10 pr-10 py-2 border border-[#2B2C40] rounded-lg bg-[#2B2C40] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A5ACD] focus:border-transparent transition-colors"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  {showPassword ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-2.062m4.61-1.789A4.989 4.989 0 0012 9c2.757 0 5 2.243 5 5a4.989 4.989 0 00-1.042 3.125m1.5-3.125c1.115-.658 2.053-1.469 2.92-2.316-1.275-3.05-5.065-6-9.543-6-1.258 0-2.472.29-3.582.812"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  )}
                  {showPassword ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.29 8.268 4 12 4s8.268 3.29 9.542 8c-1.274 4.71-5.71 8-9.542 8s-8.268-3.29-9.542-8z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  )}
                  {!showPassword && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.29 8.268 4 12 4s8.268 3.29 9.542 8c-1.274 4.71-5.71 8-9.542 8s-8.268-3.29-9.542-8z"
                    />
                  )}
                </svg>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Link to="#" className="text-sm font-medium text-[#6A5ACD] hover:text-[#8D7FDE] transition-colors">
              Forgot your password?
            </Link>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-105"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-[#6A5ACD] hover:text-[#8D7FDE] transition-colors">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}



