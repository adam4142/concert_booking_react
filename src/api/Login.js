import {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import {axiosInstance} from "./config";
import {setUser} from "../store/authSlice";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router";


function Login(){
    const [cred, setCred] = useState({
        email : "",
        password : ""
    });
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value });
    };

    async function attemptLogin(e) {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/api/login", cred);

            const {user, token } = response.data;

            localStorage.setItem("token", token);
            console.log(token);
            dispatch(setUser(user));
            navigate("/")
            console.log("Logged In successfully");
        } catch (err) {
            console.log("Login Error", err)
        }
    }

    useEffect(() => {
        if(localStorage.getItem("token")){
            navigate("/")
        }
    }, []);
return (
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-5 col-lg-4">
                <div className="card shadow-sm border-0 mt-4">
                    <div className="card-body p-4">

                        <h2 className="text-center fw-bold mb-4">Login</h2>

                        <form onSubmit={attemptLogin}>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    className="form-control form-control-lg"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    className="form-control form-control-lg"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <div className="d-grid gap-2 mt-4">
                                <button type="submit" className="btn btn-primary btn-lg shadow-sm">
                                    Sign In
                                </button>
                            </div>
                        </form>

                        <div className="text-center mt-4">
                            <hr className="text-muted"/>
                            <p className="mb-0 text-muted">
                                Don't have an account?
                                <Link to="/register" className="text-decoration-none fw-bold">Register here</Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
)
};

export default Login;