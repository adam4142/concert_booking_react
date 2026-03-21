import {useState} from "react";
import {useNavigate} from "react-router";
import {axiosInstance} from "./config";
import {Link} from "react-router-dom";
import login from "./Login";


function Register(){
    let [reg, setReg]=useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    let navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value } = e.target;
        setReg({...reg, [name]: value});
    };

    async function createUser(e) {
        e.preventDefault();

        if (reg.password !== reg.confirmPassword) {
            alert("Passwords does not match");
            return;
        }

        try {
            const response = await axiosInstance.post("/api/register", reg);
            console.log("User created:", response.data);
            alert("Registration Successfull");
            navigate("/login");
        } catch (error) {
            console.error("Registration failed:", error.response.data || error.message);
        }
    }
    return (
        <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '12px' }}>
                <div className="card-body">
                    <h2 className="text-center mb-4 fw-bold text-primary">Create Account</h2>

                    <form onSubmit={createUser}>
                        {/* First Name */}
                        <div className="mb-3 text-start">
                            <label className="form-label fw-semibold">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="fname"
                                placeholder="John"
                                value={reg.fname}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Last Name */}
                        <div className="mb-3 text-start">
                            <label className="form-label fw-semibold">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="lname"
                                placeholder="Doe"
                                value={reg.lname}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-3 text-start">
                            <label className="form-label fw-semibold">Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="name@example.com"
                                value={reg.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-4 text-start">
                            <label className="form-label fw-semibold">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="••••••••"
                                value={reg.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-semibold small">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="confirmPassword"
                                value={reg.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-lg shadow-sm">
                                Register
                            </button>
                        </div>
                    </form>

                    <p className="text-center mt-3 mb-0 small text-muted">
                        Already have an account? <Link to="/login" className="text-decoration-none fw-bold">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default Register;