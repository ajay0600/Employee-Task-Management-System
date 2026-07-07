import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


function Login() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();
   
   const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await api.post("/Auth/login", {
            email: email,
            password: password
        });

        const data = response.data;

if (rememberMe) {

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.role);
    localStorage.setItem("fullName", response.data.fullName);

} else {

    sessionStorage.setItem("token", response.data.token);
    sessionStorage.setItem("role", response.data.role);
    sessionStorage.setItem("fullName", response.data.fullName);

}

localStorage.setItem("role", data.role);
localStorage.setItem("fullName", data.fullName);

alert("Login Successful");

if (response.data.role === "Admin") {
    navigate("/dashboard");
}
else {
    navigate("/dashboard");
}

    } catch (error) {

        alert("Invalid Email or Password");

        console.log(error);

    }
};
   
    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="text-center mb-4">
                                Employee Task Management
                            </h2>

                            <h4 className="text-center mb-4">
                                Login
                            </h4>

                            <form onSubmit={handleLogin}>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="form-check-center mb-3">

                                    <input
                                        type="checkbox"
                                        className="form-check-input me-2"
                                        id="rememberMe"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />

                                    <label
                                        className="form-check-label mb-0"
                                        htmlFor="rememberMe"
                                    >
                                        Remember Me
                                    </label>

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Login
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;