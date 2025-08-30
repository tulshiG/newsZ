// // Signup.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// /**
//  * Signup component for user registration.
//  * It provides a form for users to create a new account with their name, email, and password.
//  * The form validates passwords and handles submission to the Flask backend.
//  */
// export function Signup() {
//   // State variables for form inputs
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   // State to toggle password visibility
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   // State for feedback messages and their type (success/error)
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("");

//   const navigate = useNavigate();

//   // Functions to toggle password visibility
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };
//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   // Handle form submission for signup
//   const handleSignup = async (e) => {
//     e.preventDefault();
//     // Clear previous messages
//     setMessage("");
//     setMessageType("");

//     if (password !== confirmPassword) {
//       setMessage("Passwords do not match.");
//       setMessageType("error");
//       return;
//     }

//     try {
//       // Send a POST request to the Flask backend
//       const response = await fetch("http://127.0.0.1:5000/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage(data.message);
//         setMessageType("success");
//         // Optional: Redirect to login page after successful signup
//         // setTimeout(() => navigate("/login"), 2000); 
//       } else {
//         setMessage(data.message);
//         setMessageType("error");
//       }
//     } catch (error) {
//       console.error("Signup failed:", error);
//       setMessage("An error occurred. Please try again later.");
//       setMessageType("error");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-[#1A1A2E] text-gray-200 p-4 font-sans">
//       <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-[#1F2036] border border-[#2B2C40] transform transition-transform duration-300 hover:scale-[1.01]">
//         <div className="flex flex-col items-center mb-8">
//           {/* SVG for NewsHub Logo */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="w-12 h-12 mb-2 text-[#6A5ACD] transform transition-transform duration-300 hover:rotate-6"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="1.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
//             <path d="M14 2v6h6"></path>
//             <path d="M8 12h8"></path>
//             <path d="M8 16h8"></path>
//             <path d="M12 20h4"></path>
//           </svg>
//           <h1 className="text-3xl font-bold text-white">NewsZ</h1>
//         </div>
//         <h2 className="text-2xl font-semibold text-center text-white mb-2">Create Account</h2>
//         <p className="text-center text-gray-400 mb-6">
//           Join NewsZ to start your personalized news journey
//         </p>

//         {/* Message box for feedback */}
//         {message && (
//           <div
//             className={`p-3 mb-4 rounded-lg text-sm transition-opacity duration-500 ${
//               messageType === "success"
//                 ? "bg-green-600 text-white"
//                 : "bg-red-600 text-white"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         <form className="space-y-6" onSubmit={handleSignup}>
//           <div>
//             <label className="block text-sm font-medium text-gray-400">
//               Full Name
//             </label>
//             <div className="mt-1 relative rounded-md shadow-sm">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <svg
//                   className="h-5 w-5 text-gray-500"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <input
//                 type="text"
//                 className="block w-full pl-10 pr-3 py-2 border border-[#2B2C40] rounded-lg bg-[#2B2C40] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A5ACD] focus:border-transparent transition-colors"
//                 placeholder="Enter your full name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-400">
//               Email Address
//             </label>
//             <div className="mt-1 relative rounded-md shadow-sm">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <svg
//                   className="h-5 w-5 text-gray-500"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                   <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                 </svg>
//               </div>
//               <input
//                 type="email"
//                 className="block w-full pl-10 pr-3 py-2 border border-[#2B2C40] rounded-lg bg-[#2B2C40] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A5ACD] focus:border-transparent transition-colors"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-400">
//               Password
//             </label>
//             <div className="mt-1 relative rounded-md shadow-sm">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <svg
//                   className="h-5 w-5 text-gray-500"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 016 0v2h2V7a5 5 0 10-10 0v2h-1a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H10V7a3 3 0 01-3 3v2h6a2 2 0 002-2V7a5 5 0 10-10 0v2h1a2 2 0 002-2V7a3 3 0 013-3z" />
//                 </svg>
//               </div>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 className="block w-full pl-10 pr-10 py-2 border border-[#2B2C40] rounded-lg bg-[#2B2C40] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A5ACD] focus:border-transparent transition-colors"
//                 placeholder="Create a password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <div
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
//                 onClick={togglePasswordVisibility}
//               >
//                 <svg
//                   className="h-5 w-5 text-gray-500"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   {showPassword ? (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-2.062m4.61-1.789A4.989 4.989 0 0012 9c2.757 0 5 2.243 5 5a4.989 4.989 0 00-1.042 3.125m1.5-3.125c1.115-.658 2.053-1.469 2.92-2.316-1.275-3.05-5.065-6-9.543-6-1.258 0-2.472.29-3.582.812"
//                     />
//                   ) : (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   )}
//                   {showPassword ? (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M2.458 12C3.732 7.29 8.268 4 12 4s8.268 3.29 9.542 8c-1.274 4.71-5.71 8-9.542 8s-8.268-3.29-9.542-8z"
//                     />
//                   ) : (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   )}
//                   {!showPassword && (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M2.458 12C3.732 7.29 8.268 4 12 4s8.268 3.29 9.542 8c-1.274 4.71-5.71 8-9.542 8s-8.268-3.29-9.542-8z"
//                     />
//                   )}
//                 </svg>
//               </div>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-400">
//               Confirm Password
//             </label>
//             <div className="mt-1 relative rounded-md shadow-sm">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <svg
//                   className="h-5 w-5 text-gray-500"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 016 0v2h2V7a5 5 0 10-10 0v2h1a2 2 0 002-2V7a3 3 0 013-3z" />
//                 </svg>
//               </div>
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 className="block w-full pl-10 pr-10 py-2 border border-[#2B2C40] rounded-lg bg-[#2B2C40] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A5ACD] focus:border-transparent transition-colors"
//                 placeholder="Confirm your password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//               <div
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
//                 onClick={toggleConfirmPasswordVisibility}
//               >
//                 <svg
//                   className="h-5 w-5 text-gray-500"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                 >
//                   {showConfirmPassword ? (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-2.062m4.61-1.789A4.989 4.989 0 0012 9c2.757 0 5 2.243 5 5a4.989 4.989 0 00-1.042 3.125m1.5-3.125c1.115-.658 2.053-1.469 2.92-2.316-1.275-3.05-5.065-6-9.543-6-1.258 0-2.472.29-3.582.812"
//                     />
//                   ) : (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   )}
//                   {showConfirmPassword ? (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M2.458 12C3.732 7.29 8.268 4 12 4s8.268 3.29 9.542 8c-1.274 4.71-5.71 8-9.542 8s-8.268-3.29-9.542-8z"
//                     />
//                   ) : (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   )}
//                   {!showConfirmPassword && (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M2.458 12C3.732 7.29 8.268 4 12 4s8.268 3.29 9.542 8c-1.274 4.71-5.71 8-9.542 8s-8.268-3.29-9.542-8z"
//                     />
//                   )}
//                 </svg>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center">
//             <input
//               id="terms_and_privacy"
//               name="terms_and_privacy"
//               type="checkbox"
//               className="h-4 w-4 text-[#6A5ACD] rounded-md focus:ring-purple-500 border-gray-600"
//             />
//             <label htmlFor="terms_and_privacy" className="ml-2 block text-sm text-gray-400">
//               I agree to the{" "}
//               <a href="#" className="font-medium text-[#6A5ACD] hover:text-[#8D7FDE] transition-colors">
//                 Terms of Service
//               </a>{" "}
//               and{" "}
//               <a href="#" className="font-medium text-[#6A5ACD] hover:text-[#8D7FDE] transition-colors">
//                 Privacy Policy
//               </a>
//             </label>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-105"
//             >
//               Create Account
//             </button>
//           </div>
//         </form>

//         <div className="mt-6 text-center text-sm">
//           <p className="text-gray-400">
//             Already have an account?{" "}
//             <a href="/login" className="font-medium text-[#6A5ACD] hover:text-[#8D7FDE] transition-colors">
//               Sign in here
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

/**
 * Signup component for user registration.
 * It provides a form for users to create a new account with their name, email, and password.
 * The form validates passwords and handles submission to the Flask backend.
 */
export function Signup() {
  // State variables for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // State for feedback messages and their type (success/error)
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  // Functions to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Handle form submission for signup
  const handleSignup = async (e) => {
    e.preventDefault();
    // Clear previous messages
    setMessage("");
    setMessageType("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    try {
      // Send a POST request to the Flask backend
      const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setMessageType("success");
        // Clear all form fields on successful signup
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        // Optional: Redirect to login page after successful signup
        // setTimeout(() => navigate("/login"), 2000); 
        
        
        navigate("/login");
      
      } else {
        setMessage(data.message);
        setMessageType("error");
      }
    } catch (error) {
      console.error("Signup failed:", error);
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
        <h2 className="text-2xl font-semibold text-center text-white mb-2">Create Account</h2>
        <p className="text-center text-gray-400 mb-6">
          Join NewsZ to start your personalized news journey
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

        <form className="space-y-6" onSubmit={handleSignup}>
          <div>
            <label className="block text-sm font-medium text-gray-400">
              Full Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-[#2B2C40] rounded-lg bg-[#2B2C40] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A5ACD] focus:border-transparent transition-colors"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

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
                placeholder="Create a password"
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

          <div>
            <label className="block text-sm font-medium text-gray-400">
              Confirm Password
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
                type={showConfirmPassword ? "text" : "password"}
                className="block w-full pl-10 pr-10 py-2 border border-[#2B2C40] rounded-lg bg-[#2B2C40] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6A5ACD] focus:border-transparent transition-colors"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  {showConfirmPassword ? (
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
                  {showConfirmPassword ? (
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
                  {!showConfirmPassword && (
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

          

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-105"
            >
              Create Account
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-[#6A5ACD] hover:text-[#8D7FDE] transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
