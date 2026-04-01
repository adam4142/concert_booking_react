import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {axiosInstance} from "./config";
import {useSelector} from "react-redux";


function EditConcert() {
    const {concertid} = useParams();
    const [concertName, setConcertName] = useState('');
    const [venue, setVenue] = useState('');
    const [price, setPrice] = useState(0);
    const [date, setDate] = useState('');
    const [availTickets, setAvailTickets] = useState(0);
    let navigate = useNavigate();

    const user=useSelector(store => store.auth.user);

    const fetchData = async () => {
        const result = await axiosInstance.get('/api/singleConcert/'+concertid, {
            headers: {'Authorization': "Bearer " +user.token}
        });
        const data = result.data.Concert;
        setConcertName(data.concertName);
        setVenue(data.venue);
        setPrice(data.price);
        setAvailTickets(data.availTicket);
        setDate(data.date);
    }

    const updateConcert = async () => {
        const result = await axiosInstance.post('/api/editConcert/'+concertid, {

        concertName : concertName,
            venue: venue,
            price: price,
            date: date,
            availTicket: availTickets
        },   {headers: {'Authorization': "Bearer " +user.token}},).then(response=>{
            alert(response.data.message)
        })
    }
    useEffect(() => {
        fetchData().then(r => {
            alert("rendered");
        });
    }, [concertid]);

return (
    <div className="container mt-5">
        <div className="card shadow-sm p-4">
            <h2 className="mb-4">Edit Concert Details</h2>
            <form onSubmit={(e) => { e.preventDefault(); updateConcert(); }}>

                <div className="mb-3">
                    <label className="form-label">Concert Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={concertName}
                        onChange={(e) => setConcertName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Venue</label>
                    <input
                        type="text"
                        className="form-control"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        required
                    />
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Price ($)</label>
                        <input
                            type="number"
                            className="form-control"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Available Tickets</label>
                        <input
                            type="number"
                            className="form-control"
                            value={availTickets}
                            onChange={(e) => setAvailTickets(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="form-label">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">Update Concert</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
)
}
export default EditConcert;