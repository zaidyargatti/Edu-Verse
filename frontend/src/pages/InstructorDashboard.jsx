import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/Axios";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const InstructorDashboard = ({ setUser }) => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const fetchLectures = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await api.get("/instructor/lectures");
      setLectures(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load lectures");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  // Get instructor initials from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "IN";

  // Upcoming vs past lectures
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming = lectures.filter((l) => new Date(l.date) >= today);
  const past = lectures.filter((l) => new Date(l.date) < today);

  return (
    <div className="min-h-screen bg-[#060910] px-4 py-10">

      {/* ── TOP NAV ── */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-10">

        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
            </svg>
          </div>
          <span className="text-[#f0f6ff] text-lg font-semibold tracking-wide">EduVerse</span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* Badge */}
          <div className="hidden sm:inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/25 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-400 text-[10px] uppercase tracking-widest font-medium">Instructor</span>
          </div>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs text-white font-semibold">
            {initials}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-[#8ba3c7] text-sm hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all duration-200 group"
          >
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* ── PAGE HEADING ── */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-[#f0f6ff] mb-1">My Lectures</h1>
        <p className="text-[#8ba3c7] text-sm">View and manage all your assigned lectures</p>
      </div>

      {/* ── ERROR ── */}
      <div className="max-w-4xl mx-auto mb-6">
        <ErrorMessage message={error} />
      </div>

      {/* ── STAT CARDS ── */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          {
            label: "Total Lectures",
            value: lectures.length,
            color: "blue",
            icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
          },
          {
            label: "Upcoming",
            value: upcoming.length,
            color: "purple",
            icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
          },
          {
            label: "Completed",
            value: past.length,
            color: "teal",
            icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
          },
          {
            label: "Courses",
            value: [...new Set(lectures.map((l) => l.courseId?._id))].length,
            color: "amber",
            icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
          },
        ].map(({ label, value, color, icon }) => {
          const colors = {
            blue:   { bg: "bg-blue-500/10",   border: "border-blue-500/20",   text: "text-blue-400" },
            purple: { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400" },
            teal:   { bg: "bg-teal-500/10",   border: "border-teal-500/20",   text: "text-teal-400" },
            amber:  { bg: "bg-amber-500/10",  border: "border-amber-500/20",  text: "text-amber-400" },
          };
          const c = colors[color];
          return (
            <div key={label} className={`${c.bg} border ${c.border} rounded-2xl p-4`}>
              <div className={`w-8 h-8 rounded-lg ${c.bg} border ${c.border} flex items-center justify-center mb-3`}>
                <svg className={`w-4 h-4 ${c.text}`} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                </svg>
              </div>
              <p className={`text-2xl font-bold ${c.text} mb-0.5`}>{value}</p>
              <p className="text-[#8ba3c7] text-xs">{label}</p>
            </div>
          );
        })}
      </div>

      {/* ── LECTURES LIST ── */}
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader />
          </div>

        ) : lectures.length === 0 ? (

          /* ── EMPTY STATE ── */
          <div className="bg-[#0d1117] border border-white/[0.07] rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-[#f0f6ff] font-semibold text-lg mb-1">No lectures assigned yet</p>
            <p className="text-[#8ba3c7] text-sm">Your admin will assign lectures to you soon.</p>
          </div>

        ) : (
          <div className="space-y-4">

            {/* Upcoming Section */}
            {upcoming.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[11px] text-purple-400 uppercase tracking-widest font-medium">Upcoming</span>
                  <div className="flex-1 h-px bg-white/[0.05]" />
                  <span className="text-[11px] text-[#4a6080]">{upcoming.length} lecture{upcoming.length !== 1 ? "s" : ""}</span>
                </div>
                <div className="space-y-3">
                  {upcoming.map((lecture) => {
                    const lectureDate = new Date(lecture.date);
                    const isToday = lectureDate.toDateString() === new Date().toDateString();
                    return (
                      <div
                        key={lecture._id}
                        className="bg-[#0d1117] border border-white/[0.07] hover:border-purple-500/30 rounded-2xl p-5 transition-all duration-200 group"
                      >
                        <div className="flex items-start justify-between gap-4">

                          {/* Date block */}
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex flex-col items-center justify-center shrink-0">
                              <span className="text-purple-400 text-xs font-medium uppercase leading-none">
                                {lectureDate.toLocaleString("default", { month: "short" })}
                              </span>
                              <span className="text-[#f0f6ff] text-lg font-bold leading-tight">
                                {lectureDate.getDate()}
                              </span>
                            </div>

                            <div>
                              <p className="text-[#f0f6ff] font-semibold text-base group-hover:text-purple-300 transition-colors duration-200">
                                {lecture.courseId?.name || "Untitled Course"}
                              </p>
                              <p className="text-[#8ba3c7] text-sm mt-0.5">
                                {lectureDate.toLocaleDateString("en-US", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          </div>

                          {/* Badge */}
                          <div className="shrink-0">
                            {isToday ? (
                              <span className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/25 text-blue-400 text-[10px] uppercase tracking-widest font-medium px-2.5 py-1 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                                Today
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/25 text-purple-400 text-[10px] uppercase tracking-widest font-medium px-2.5 py-1 rounded-full">
                                Upcoming
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Past Section */}
            {past.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[11px] text-[#8ba3c7] uppercase tracking-widest font-medium">Completed</span>
                  <div className="flex-1 h-px bg-white/[0.05]" />
                  <span className="text-[11px] text-[#4a6080]">{past.length} lecture{past.length !== 1 ? "s" : ""}</span>
                </div>
                <div className="space-y-3">
                  {past.map((lecture) => {
                    const lectureDate = new Date(lecture.date);
                    return (
                      <div
                        key={lecture._id}
                        className="bg-[#0d1117] border border-white/[0.04] rounded-2xl p-5 opacity-60 hover:opacity-80 transition-all duration-200 group"
                      >
                        <div className="flex items-start justify-between gap-4">

                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/[0.03] border border-white/[0.06] rounded-xl flex flex-col items-center justify-center shrink-0">
                              <span className="text-[#8ba3c7] text-xs font-medium uppercase leading-none">
                                {lectureDate.toLocaleString("default", { month: "short" })}
                              </span>
                              <span className="text-[#f0f6ff] text-lg font-bold leading-tight">
                                {lectureDate.getDate()}
                              </span>
                            </div>

                            <div>
                              <p className="text-[#f0f6ff] font-semibold text-base">
                                {lecture.courseId?.name || "Untitled Course"}
                              </p>
                              <p className="text-[#8ba3c7] text-sm mt-0.5">
                                {lectureDate.toLocaleDateString("en-US", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          </div>

                          <span className="shrink-0 inline-flex items-center gap-1.5 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] uppercase tracking-widest font-medium px-2.5 py-1 rounded-full">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Done
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      <div className="max-w-4xl mx-auto mt-10 pt-6 border-t border-white/[0.05] flex items-center justify-between">
        <p className="text-[#4a6080] text-xs">EduVerse Instructor · v1.0</p>
        <p className="text-[#4a6080] text-xs">© {new Date().getFullYear()} EduVerse. All rights reserved.</p>
      </div>
    </div>
  );
};

export default InstructorDashboard;