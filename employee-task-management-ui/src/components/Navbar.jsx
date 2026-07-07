import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const role =
        localStorage.getItem("role") ||
        sessionStorage.getItem("role");

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("fullName");

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("fullName");

        navigate("/");
    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link
                    className="navbar-brand"
                    to="/dashboard"
                >
                    Employee Task Management
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav me-auto">

                        {/* Dashboard for both Admin & Employee */}
                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/dashboard"
                            >
                                Dashboard
                            </Link>

                        </li>

                        {/* Employees only for Admin */}
                        {role === "Admin" && (

                            <li className="nav-item">

                                <Link
                                    className="nav-link"
                                    to="/employees"
                                >
                                    Employees
                                </Link>

                            </li>

                        )}

                        {/* Tasks */}
                        <li className="nav-item">

                            <Link
                                className="nav-link"
                                to="/tasks"
                            >
                                {role === "Admin"
                                    ? "Tasks"
                                    : "My Tasks"}
                            </Link>

                        </li>

                    </ul>

                    <button
                        className="btn btn-danger"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );
}

export default Navbar;