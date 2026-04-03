import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Login from "../pages/Login";
import AdminDashboard from "../pages/AdminDashboard";
import InstructorDashboard from "../pages/InstructorDashboard";

const AppRoutes = ({ user, setUser }) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        user ? (
                            user.role === "admin"
                                ? <Navigate to="/admin" />
                                : <Navigate to="/instructor" />
                        ) : (
                            <Login setUser={setUser} />
                        )
                    }
                />
                <Route
                    path="/admin"
                    element={
                        user?.role === "admin"
                            ? <AdminDashboard setUser={setUser}/>
                            : <Navigate to="/" />
                    }
                />

                <Route
          path="/instructor"
          element={
            user?.role === "instructor"
              ? <InstructorDashboard setUser={setUser} />
              : <Navigate to="/" />
          }
        />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;