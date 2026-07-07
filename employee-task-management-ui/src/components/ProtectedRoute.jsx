import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {

    const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

    const role =
        localStorage.getItem("role") ||
        sessionStorage.getItem("role");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    // Only Admin can access admin pages
    if (adminOnly && role !== "Admin") {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default ProtectedRoute;