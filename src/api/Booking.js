import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { axiosInstance } from "./config";

function Booking() {
    const { concertId } = useParams();
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();

    // Default to 1 ticket instead of 0
    const [noOfTicketsBooked, setNumberOfTicketsBooked] = useState(1);

    const handleBooking = async () => {
        if (!user || !user.token) {
            alert("Please login to book tickets");
            navigate('/login');
            return;
        }

        try {
            const result = await axiosInstance.post(
                `/api/createBooking/${concertId}/${user.id}`,
                { noOfTicketsBooked: parseInt(noOfTicketsBooked) },
                {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                }
            );

            console.log("Booking successful:", result.data);
            alert("Booking Confirmed!");
            navigate('/my-bookings'); // Redirect user after success

        } catch (error) {
            console.error("Booking failed:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="booking-container" style={{ padding: '40px', textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '20px' }}>Confirm Your Selection</h2>
            <p>Concert ID: <strong>{concertId}</strong></p>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>Number of Tickets:</label>
                <input
                    type="number"
                    min="1"
                    max="10"
                    value={noOfTicketsBooked}
                    onChange={(e) => setNumberOfTicketsBooked(e.target.value)}
                    style={{
                        padding: '10px',
                        width: '100%',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        textAlign: 'center'
                    }}
                />
            </div>

            <button
                onClick={handleBooking}
                style={{
                    padding: '12px 24px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    width: '100%',
                    fontWeight: 'bold'
                }}
            >
                Book Ticket Now
            </button>
        </div>
    );
}

export default Booking;