import {useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {axiosInstance} from "./config";


function Booking() {
    const {concertId ,userId}=useParams();
    const [loading, setLoading] = useState(false);

    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();

    const handleBooking = async () => {
        if (!user || !user.token) {
            alert("Please login to book ticket");
            navigate('/login');
        }
        setLoading(true);

        const book = async () => {
            try {
                const result = await axiosInstance.post(
                    `/api/createBooking/${concertId}/${userId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                    }
                );
                console.log(result)
                return result.data;
            } catch (error) {
                console.error("Booking failed:", error);
            }
        };
    }

        return (
            <div className="booking-container" style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Confirm Your Selection</h2>
                <p>Ready to book your ticket for Concert #{concertId}?</p>

                <button
                    onClick={handleBooking}
                    disabled={loading}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: loading ? '#ccc' : '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? "Processing..." : "Book Ticket Now"}
                </button>

                {loading && <p style={{ marginTop: '10px', color: '#666' }}>Finalizing your reservation...</p>}
            </div>
        );

}
    export default Booking;
