import {useState} from "react";
import {axiosInstance} from "./config";
import checkAuth from "../store/checkAuth";
import {useSelector} from "react-redux";
import store from "../store/store";


function AddConcert() {
    let [concert, setConcert] = useState({
        "concertName": "",
        "venue": "",
        "price": 0,
        "date": "",
        "availTicket": 0
    });

const user=useSelector(store => store.auth.user)
    console.log(user)


    const handleChange = (e) => {
        const {name, value} = e.target;
        setConcert({...concert, [name]: value})
    }

    async function createConcert(e) {
        try {
            e.preventDefault()

            const response = await axiosInstance.post("/api/add_concert", concert,
                {headers:{'Authorization':"Bearer "+ user.token}}

                );
            console.log("Concert Created", response.data);
            alert("Concert Created");
        } catch (error) {
            console.error("Concert creation failed", error.response.data || error.message);
        }
    }
    return (<div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow border-0" style={{ borderRadius: "15px" }}>
                        <div className="card-body p-4">
                            <h3 className="text-center mb-4" style={{ color: "#333", fontWeight: "600" }}>
                                Create New Concert
                            </h3>
                            <form onSubmit={createConcert} >
                                {/* Concert Name */}
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Concert Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="concertName"
                                        value={concert.concertName}
                                        onChange={handleChange}
                                        placeholder="e.g. Rock Night 2024"
                                        required
                                    />
                                </div>

                                {/* Venue */}
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Venue</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="venue"
                                        value={concert.venue}
                                        onChange={handleChange}
                                        placeholder="e.g. Madison Square Garden"
                                        required
                                    />
                                </div>

                                <div className="row">
                                    {/* Price */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold">Ticket Price ($)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="price"
                                            value={concert.price}
                                            onChange={handleChange}
                                            min="0"
                                            required
                                        />
                                    </div>
                                    {/* Available Tickets */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold">Total Tickets</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="availTicket"
                                            value={concert.availTicket}
                                            onChange={handleChange}
                                            min="1"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Date */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold">Event Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="date"
                                        value={concert.date}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                        style={{ backgroundColor: "#007bff", border: "none", borderRadius: "8px" }}
                                    >
                                        Publish Concert
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default checkAuth(AddConcert);