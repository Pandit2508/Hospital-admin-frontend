import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // LOGIN HANDLER
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter valid credentials");
      return;
    }

    try {
      setLoading(true);

      // Firebase login
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      // Check if hospital document exists
      const docRef = doc(db, "hospitals", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // User already registered → Go to dashboard
        localStorage.setItem("hospitalID", user.uid);
        navigate("/dashboard");
      } else {
        // User not registered yet → Go to hospital registration
        alert("Please complete your hospital registration.");
        setTimeout(() => {
          navigate("/HospitalRegistration");
        }, 300);
      }

    } catch (error) {
      alert("Invalid login: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // PASSWORD RESET
  const handleForgotPassword = async () => {
    const userEmail = prompt("Enter your registered email:");

    if (!userEmail) return;

    try {
      await sendPasswordResetEmail(auth, userEmail);
      alert("Password reset link sent! Check your email.");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-gray-900 text-white font-[Poppins]">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <nav className="absolute top-0 left-0 w-full flex items-center justify-between p-6 bg-transparent z-10">
        <div className="text-2xl font-bold">🏥 CarePulse</div>
      </nav>

      <div className="relative z-10 bg-gray-800 bg-opacity-90 p-10 rounded-2xl shadow-2xl w-96 text-center">
        <div className="text-5xl mb-6">⚕</div>
        <h2 className="text-2xl font-semibold mb-6">Hospital Login Portal</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Hospital Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-md border border-gray-600 bg-gray-900 text-white"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-md border border-gray-600 bg-gray-900 text-white"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`mt-3 ${
              loading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
            } transition-all text-white font-semibold py-3 rounded-md`}
          >
            {loading ? "Logging in..." : "Login to Portal"}
          </button>

          <div className="flex justify-between text-sm text-blue-300 mt-3">
            <button onClick={handleForgotPassword} className="hover:underline">
              Forgot Password?
            </button>
            <label className="flex items-center gap-2 cursor-pointer text-gray-300">
              <input type="checkbox" className="accent-blue-500" />
              Keep me logged in
            </label>
          </div>
        </form>

        {/* Bottom Links */}
        <div className="mt-6 text-sm text-gray-300 space-y-2">
          <button
            onClick={() => navigate("/signup")}
            className="block w-full text-blue-400 hover:underline"
          >
            Signup
          </button>

          <button className="block w-full text-blue-400 hover:underline">
            Need Help?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
