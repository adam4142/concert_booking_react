import {useEffect, useState} from "react";
import {axiosInstance} from "./config";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import EditConcert from "./EditConcert";

function LIstConcert() {

    const [concert, setConcert] = useState([]);

    const user = useSelector(store => store.auth.user);

    const getConcert = async () => {
        const result = await axiosInstance.get("/api/listConcerts", {
            headers: {
                'Authorization': "Bearer " + user.token
            }
        })
        setConcert(result.data.concert);
        console.log(result.data);
    }
    useEffect(() => {
    getConcert();
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Available Concerts</h2>
                <span className="badge bg-primary">Total: {concert.length}</span>
            </div>

            <div className="table-responsive">
                <table className="table table-hover border">
                    <thead className="table-light">
                    <tr>
                        <th>Concert Name</th>
                        <th>Venue</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Tickets Left</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {concert.length > 0 ? (
                        concert.map((item) => (
                            <tr key={item.id}>
                                <td className="fw-bold">{item.concertName}</td>
                                <td>{item.venue}</td>
                                <td>{item.date}</td>
                                <td>${item.price}</td>
                                <td>
                                        <span className={`badge ${item.availTickets > 10 ? 'bg-success' : 'bg-danger'}`}>
                                            {item.availTicket}
                                        </span>
                                </td>
                                <td>
                               <Link to="/update/{item.id}">Edit</Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-4 text-muted">
                                No concerts found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );


}
export default LIstConcert;