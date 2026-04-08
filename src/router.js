import {createBrowserRouter} from "react-router";
import App from "./App";
import About from "./components/About";
import Register from "./api/Register";
import Login from "./api/Login";
import AddConcert from "./api/AddConcert";
import AdminPanel from "./api/AdminPanel";
import EditConcert from "./api/EditConcert";
import LIstConcert from "./api/LIstConcert";
import Booking from "./api/Booking";
import MyBooking from "./api/MyBooking";

const router = createBrowserRouter([
    { path: '/', element: <App/> },
    { path: 'about', element: <About/> },
    { path: 'register', element: <Register/>},
    {path: 'login', element: <Login/>},
    {path: 'create', element: <AddConcert/>},
    {path: 'admin', element: <AdminPanel/>},
    {path: 'update/:concertId', element: <EditConcert/>},
    {path: 'list', element: <LIstConcert/>},
    {path: 'book/:concertId', element: <Booking/>},
    {path: 'booking', element: <MyBooking/>}
]);

export default router;