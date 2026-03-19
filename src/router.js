import {createBrowserRouter} from "react-router";
import App from "./App";
import About from "./components/About";
import Register from "./api/Register";
import Login from "./api/Login";


const router = createBrowserRouter([
    { path: '/', element: <App/> },
    { path: 'about', element: <About/> },
    { path: 'register', element: <Register/>},
    {path: 'login', element: <Login/>}
]);

export default router;