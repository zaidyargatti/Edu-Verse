import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/Axios";
import ErrorMessage from "../components/ErrorMessage";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError("");
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/instructor");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060910] px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl">

        {/* ── LEFT PANEL ── */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-[#1a2a4a] via-[#0f1d3a] to-[#0d1117] p-10 relative overflow-hidden">

          {/* Glow blobs */}
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-blue-400 opacity-10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-60 h-60 rounded-full bg-green-400 opacity-5 blur-3xl pointer-events-none" />

          {/* Brand */}
          <div className="flex items-center gap-3 z-10">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
              </svg>
            </div>
            <span className="text-[#f0f6ff] text-lg font-semibold tracking-wide">EduVerse</span>
          </div>

          {/* Headline */}
          <div className="z-10">
            <h1 className="text-4xl font-bold text-[#f0f6ff] leading-tight mb-4">
              Learn without <br />
              <span className="text-blue-400">limits.</span>
            </h1>
            <p className="text-[#8ba3c7] text-sm leading-relaxed max-w-xs">
              Access world-class courses, connect with expert instructors, and unlock your potential — all in one place.
            </p>
          </div>

        
          {/* Stats */}
          <div className="flex items-center gap-6 z-10">
            <div>
              <p className="text-[#f0f6ff] text-2xl font-bold">48K+</p>
              <p className="text-[#8ba3c7] text-[11px] uppercase tracking-wider">Students</p>
            </div>
            <div className="w-px self-stretch bg-white/10" />
            <div>
              <p className="text-[#f0f6ff] text-2xl font-bold">320</p>
              <p className="text-[#8ba3c7] text-[11px] uppercase tracking-wider">Courses</p>
            </div>
            <div className="w-px self-stretch bg-white/10" />
            <div>
              <p className="text-[#f0f6ff] text-2xl font-bold">98%</p>
              <p className="text-[#8ba3c7] text-[11px] uppercase tracking-wider">Satisfaction</p>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="bg-[#0d1117] px-10 py-12 flex flex-col justify-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 rounded-full px-3 py-1 w-fit mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-400 text-[10px] uppercase tracking-widest font-medium">Live classes available</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-[#f0f6ff] mb-1">Welcome back</h2>
          <p className="text-[#8ba3c7] text-sm mb-8">Sign in to continue your learning journey</p>

          <ErrorMessage message={error} />

          {/* Email */}
          <div className="mb-4">
            <label className="block text-[11px] text-[#8ba3c7] uppercase tracking-widest mb-2 font-medium">
              Email Address
            </label>
            <div className="relative">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a6080] pointer-events-none" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <rect x="2" y="4" width="20" height="16" rx="3" />
                <path d="M2 7l10 7 10-7" />
              </svg>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full h-11 bg-white/[0.04] border border-white/10 rounded-xl text-[#f0f6ff] text-sm pl-10 pr-4 outline-none placeholder-[#4a6080] focus:border-blue-500 focus:bg-blue-500/5 transition-all duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-[11px] text-[#8ba3c7] uppercase tracking-widest mb-2 font-medium">
              Password
            </label>
            <div className="relative">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a6080] pointer-events-none" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full h-11 bg-white/[0.04] border border-white/10 rounded-xl text-[#f0f6ff] text-sm pl-10 pr-4 outline-none placeholder-[#4a6080] focus:border-blue-500 focus:bg-blue-500/5 transition-all duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Forgot */}
          <div className="text-right mb-6">
            <a href="#" className="text-blue-400 text-xs hover:underline">Forgot password?</a>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-sm font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group mb-6"
          >
            Sign in to your classroom
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-white/[0.07]" />
            <span className="text-[#4a6080] text-[11px] uppercase tracking-widest">or continue with</span>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="h-10 bg-white/[0.04] border border-white/10 rounded-xl text-[#c8d8f0] text-xs flex items-center justify-center gap-2 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/>
                <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.615 24 12.255 24z"/>
                <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 0 0 0 10.76l3.98-3.09z"/>
                <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.64 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/>
              </svg>
              Google
            </button>
            <button className="h-10 bg-white/[0.04] border border-white/10 rounded-xl text-[#c8d8f0] text-xs flex items-center justify-center gap-2 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200">
              <svg className="w-4 h-4 fill-blue-400" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </button>
          </div>

          {/* Sign up */}
          <p className="text-center text-[#4a6080] text-xs">
            New to EduVerse?{" "}
            <a href="#" className="text-blue-400 font-medium hover:underline">Create a free account</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;