import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {

    const [dashboard, setDashboard] = useState({
        role: "",
        totalEmployees: 0,
        totalTasks: 0,
        pendingTasks: 0,
        inProgressTasks: 0,
        completedTasks: 0
    });

    useEffect(() => {
        getDashboard();
    }, []);

    const getDashboard = async () => {

        try {

            const token =
                localStorage.getItem("token") ||
                sessionStorage.getItem("token");

            const response = await api.get("/Dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setDashboard(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };

    return (

        <>

            <Navbar />

            <div className="container mt-4">

                <h2 className="mb-4 text-center">

                    {dashboard.role === "Admin"
                        ? "Admin Dashboard"
                        : "My Dashboard"}

                </h2>

                {dashboard.role === "Admin" && (

                    <div className="mb-4 text-center">

                        <Link
                            to="/employees"
                            className="btn btn-primary me-3"
                        >
                            Employee Management
                        </Link>

                        <Link
                            to="/tasks"
                            className="btn btn-success"
                        >
                            Task Management
                        </Link>

                    </div>

                )}

                <div className="row">

                    {dashboard.role === "Admin" && (

                        <div className="col-md">

                            <div className="card text-bg-primary mb-3">

                                <div className="card-body text-center">

                                    <h5>Total Employees</h5>

                                    <h2>{dashboard.totalEmployees}</h2>

                                </div>

                            </div>

                        </div>

                    )}

                    <div className="col-md">

                        <div className="card text-bg-success mb-3">

                            <div className="card-body text-center">

                                <h5>

                                    {dashboard.role === "Admin"
                                        ? "Total Tasks"
                                        : "My Tasks"}

                                </h5>

                                <h2>{dashboard.totalTasks}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md">

                        <div className="card text-bg-warning mb-3">

                            <div className="card-body text-center">

                                <h5>Pending</h5>

                                <h2>{dashboard.pendingTasks}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md">

                        <div className="card text-bg-info mb-3">

                            <div className="card-body text-center">

                                <h5>In Progress</h5>

                                <h2>{dashboard.inProgressTasks}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md">

                        <div className="card text-bg-danger mb-3">

                            <div className="card-body text-center">

                                <h5>Completed</h5>

                                <h2>{dashboard.completedTasks}</h2>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Dashboard;