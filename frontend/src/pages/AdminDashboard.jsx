import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/Axios";
import Loader from "../components/Loader";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: "bg-green-500/10 border-green-500/25 text-green-400",
    error:   "bg-red-500/10 border-red-500/25 text-red-400",
  };

  const icons = {
    success: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  };

  return (
    <div
      className={`flex items-center gap-3 border px-4 py-3 rounded-xl text-sm mt-4 animate-fade-in ${styles[type]}`}
      style={{ animation: "fadeSlideIn 0.25s ease" }}
    >
      {icons[type]}
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="opacity-60 hover:opacity-100 transition-opacity ml-2">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

const AdminDashboard = ({ setUser }) => {
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses]         = useState([]);

  const [courseForm, setCourseForm] = useState({ name: "", level: "", description: "", image: "" });
  const [lectureForm, setLectureForm] = useState({ courseId: "", instructorId: "", date: "" });

  // Separate toast state per card
  const [courseToast,  setCourseToast]  = useState(null); // { message, type }
  const [lectureToast, setLectureToast] = useState(null);

  const [courseLoading,  setCourseLoading]  = useState(false);
  const [lectureLoading, setLectureLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const fetchCourses = async () => {
    try {
      const { data } = await api.get("/courses");
      setCourses(data);
    } catch (err) {
      setCourseToast({ message: "Failed to load courses", type: "error" });
    }
  };

  const fetchInstructors = async () => {
    try {
      const { data } = await api.get("/users/instructors");
      setInstructors(data);
    } catch (err) {
      setLectureToast({ message: "Failed to load instructors", type: "error" });
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchInstructors();
  }, []);

  const handleCreateCourse = async () => {
    try {
      setCourseToast(null);
      setCourseLoading(true);
      await api.post("/courses", courseForm);
      await fetchCourses();
      setCourseToast({ message: "Course created successfully!", type: "success" });
      setCourseForm({ name: "", level: "", description: "", image: "" });
    } catch (err) {
      setCourseToast({ message: err.response?.data?.message || "Error creating course", type: "error" });
    } finally {
      setCourseLoading(false);
    }
  };

  const handleCreateLecture = async () => {
    try {
      setLectureToast(null);
      setLectureLoading(true);
      await api.post("/lectures", lectureForm);
      setLectureToast({ message: "Lecture assigned successfully!", type: "success" });
      setLectureForm({ courseId: "", instructorId: "", date: "" });
    } catch (err) {
      setLectureToast({ message: err.response?.data?.message || "Error assigning lecture", type: "error" });
    } finally {
      setLectureLoading(false);
    }
  };

  const inputClass =
    "w-full h-11 bg-white/[0.04] border border-white/10 rounded-xl text-[#f0f6ff] text-sm px-4 outline-none placeholder-[#4a6080] focus:border-blue-500 focus:bg-blue-500/5 transition-all duration-200";

  const labelClass =
    "block text-[11px] text-[#8ba3c7] uppercase tracking-widest mb-2 font-medium";

  return (
    <>
      {/* Keyframe for toast animation */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="min-h-screen bg-[#060910] px-4 py-10">

        {/* ── TOP NAV ── */}
        <div className="max-w-5xl mx-auto flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
              </svg>
            </div>
            <span className="text-[#f0f6ff] text-lg font-semibold tracking-wide">EduVerse</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-400 text-[10px] uppercase tracking-widest font-medium">Admin Panel</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs text-white font-semibold">
              AD
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-[#8ba3c7] text-sm hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all duration-200 group"
            >
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* ── PAGE HEADING ── */}
        <div className="max-w-5xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-[#f0f6ff] mb-1">Admin Dashboard</h1>
          <p className="text-[#8ba3c7] text-sm">Manage your courses and assign lectures to instructors</p>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Courses", value: courses.length, icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", color: "blue" },
            { label: "Instructors",   value: instructors.length, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", color: "purple" },
            { label: "Active Classes", value: "—", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", color: "teal" },
            { label: "Students",      value: "—", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", color: "amber" },
          ].map(({ label, value, icon, color }) => {
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

        {/* ── TWO CARDS ── */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ── ADD COURSE ── */}
          <div className="bg-[#0d1117] border border-white/[0.07] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h2 className="text-[#f0f6ff] font-semibold text-base">Add Course</h2>
                <p className="text-[#8ba3c7] text-xs">Create a new course for students</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>Course Name</label>
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a6080] pointer-events-none" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <input
                    placeholder="e.g. Advanced React"
                    className={`${inputClass} pl-10`}
                    value={courseForm.name}
                    onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Level</label>
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a6080] pointer-events-none" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <input
                    placeholder="e.g. Beginner / Intermediate / Advanced"
                    className={`${inputClass} pl-10`}
                    value={courseForm.level}
                    onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  placeholder="Brief description of the course..."
                  rows={3}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl text-[#f0f6ff] text-sm px-4 py-3 outline-none placeholder-[#4a6080] focus:border-blue-500 focus:bg-blue-500/5 transition-all duration-200 resize-none"
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                />
              </div>

              <div>
                <label className={labelClass}>Image URL</label>
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a6080] pointer-events-none" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <input
                    placeholder="https://example.com/image.jpg"
                    className={`${inputClass} pl-10`}
                    value={courseForm.image}
                    onChange={(e) => setCourseForm({ ...courseForm, image: e.target.value })}
                  />
                </div>
              </div>

              <button
                onClick={handleCreateCourse}
                disabled={courseLoading}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] text-white text-sm font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mt-2"
              >
                {courseLoading ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                )}
                {courseLoading ? "Creating..." : "Create Course"}
              </button>

              {/* ── COURSE TOAST ── */}
              {courseToast && (
                <Toast
                  message={courseToast.message}
                  type={courseToast.type}
                  onClose={() => setCourseToast(null)}
                />
              )}
            </div>
          </div>

          {/* ── ASSIGN LECTURE ── */}
          <div className="bg-[#0d1117] border border-white/[0.07] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-[#f0f6ff] font-semibold text-base">Assign Lecture</h2>
                <p className="text-[#8ba3c7] text-xs">Schedule a lecture with an instructor</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>Select Course</label>
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a6080] pointer-events-none" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <select
                    className={`${inputClass} pl-10 appearance-none cursor-pointer`}
                    value={lectureForm.courseId}
                    onChange={(e) => setLectureForm({ ...lectureForm, courseId: e.target.value })}
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  >
                    <option value="" style={{ background: "#0d1117" }}>Select a course</option>
                    {courses.map((c) => (
                      <option key={c._id} value={c._id} style={{ background: "#0d1117" }}>{c.name}</option>
                    ))}
                  </select>
                  <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a6080] pointer-events-none" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div>
                <label className={labelClass}>Select Instructor</label>
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a6080] pointer-events-none" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <select
                    className={`${inputClass} pl-10 appearance-none cursor-pointer`}
                    value={lectureForm.instructorId}
                    onChange={(e) => setLectureForm({ ...lectureForm, instructorId: e.target.value })}
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  >
                    <option value="" style={{ background: "#0d1117" }}>Select an instructor</option>
                    {instructors.map((i) => (
                      <option key={i._id} value={i._id} style={{ background: "#0d1117" }}>{i.name}</option>
                    ))}
                  </select>
                  <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a6080] pointer-events-none" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div>
                <label className={labelClass}>Lecture Date</label>
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a6080] pointer-events-none" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <input
                    type="date"
                    className={`${inputClass} pl-10`}
                    style={{ colorScheme: "dark" }}
                    value={lectureForm.date}
                    onChange={(e) => setLectureForm({ ...lectureForm, date: e.target.value })}
                  />
                </div>
              </div>

              {instructors.length > 0 && (
                <div>
                  <label className={labelClass}>Available Instructors</label>
                  <div className="flex flex-wrap gap-2">
                    {instructors.slice(0, 4).map((i) => (
                      <button
                        key={i._id}
                        onClick={() => setLectureForm({ ...lectureForm, instructorId: i._id })}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border transition-all duration-150 ${
                          lectureForm.instructorId === i._id
                            ? "bg-green-500/15 border-green-500/40 text-green-400"
                            : "bg-white/[0.04] border-white/10 text-[#8ba3c7] hover:border-white/20"
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[8px] text-white font-bold">
                          {i.name?.[0]?.toUpperCase()}
                        </span>
                        {i.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleCreateLecture}
                disabled={lectureLoading}
                className="w-full h-11 bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] text-white text-sm font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mt-2"
              >
                {lectureLoading ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
                {lectureLoading ? "Assigning..." : "Assign Lecture"}
              </button>

              {/* ── LECTURE TOAST ── */}
              {lectureToast && (
                <Toast
                  message={lectureToast.message}
                  type={lectureToast.type}
                  onClose={() => setLectureToast(null)}
                />
              )}
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="max-w-5xl mx-auto mt-10 pt-6 border-t border-white/[0.05] flex items-center justify-between">
          <p className="text-[#4a6080] text-xs">EduVerse Admin · v1.0</p>
          <p className="text-[#4a6080] text-xs">© {new Date().getFullYear()} EduVerse. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;