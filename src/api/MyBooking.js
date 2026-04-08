import { useSelector } from "react-redux";
import { axiosInstance } from "./config";
import { useEffect, useState } from "react";
import booking from "./Booking";

// FIX: Changed "myBooking" to "MyBooking" (Capitalized)
function MyBooking() {
    const user = useSelector(state => state.auth.user);
    const [bookingData, setBookingData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                // Using backticks for template literals
                const result = await axiosInstance.get(`/api/myBooking/${user.id}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                // Set data - ensure the path matches your API response structure
                setBookingData(result.data.booking || result.data);
                console.log(result)
            } catch (err) {
                console.error("Fetch error:", err);
            }
        };

        // Only fetch if user object exists
        if (user?.id) {
            getData();
        }

        // FIX: Added dependencies that were missing
    }, [user.id, user.token]);

    return (
        <div>
            <h2>My Bookings</h2>
            {/* Using bookingData here resolves the "unused variable" warning */}
            {bookingData.length > 0 ? (
                bookingData.map((b, i) => (
                    <div key={i}>{b.concertName}</div>
                ))
            ) : (
                <p>No bookings found.</p>
            )}
        </div>
    );
}

export default MyBooking;