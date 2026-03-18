import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router";
import {axiosInstance} from "./config";


function Register(){
    let [reg, setReg]=useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
    });

    let navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value } = e.target;
        setReg({...reg, [name]: value});
    };

    async function createUser(e) {
        e.preventDefault();
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
        <div className="register-container">
            <h2>Create Account</h2>
            <form onSubmit={createUser}>
                <div>
                    <label>First Name</label>
                    <input type="text" name="fname" value={reg.fname} onChange={handleChange} required />
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" name="lname" value={reg.lname} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={reg.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={reg.password} onChange={handleChange} required />
                </div>
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
export default Register;