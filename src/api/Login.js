import {useState} from "react";
import { useDispatch } from "react-redux";
import {axiosInstance} from "./config";
import {setUser} from "../store/authSlice";


function Login(){
    const [cred, setCred] = useState({
        email : "",
        password : ""
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value });
    };

    async function attemptLogin(e) {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/api/login", cred);

            const {user, token } = response.data;

            localStorage.setItem("token", token);
            dispatch(setUser(user));

            console.log("Logged In successfully");
        } catch (err) {
            console.log("Login Error", err)
        }
    }
return (
    <form onSubmit={attemptLogin}>
        <input name="email" type="email" onChange={handleChange} placeholder="Email" />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" />
        <button type="submit">Login</button>
    </form>
)};

export default Login;