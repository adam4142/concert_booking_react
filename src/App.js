import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { axiosInstance } from "./api/config";
import checkAuth from "./store/checkAuth";

function App() {
    const user = useSelector(store => store.auth.user);
    const [concerts, setConcerts] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('user');
        navigate('/login');
    };

    useEffect(() => {
        const getConcerts = async () => {
            try {
                const result = await axiosInstance.get("/api/listConcerts", {
                    headers: { 'Authorization': "Bearer " + user.token }
                });
                // Ensure we are hitting the 'concert' array in your specific API response
                setConcerts(result.data.concert || []);
            } catch (error) {
                console.error("Error fetching concerts:", error);
                setConcerts([]);
            } finally {
                setLoading(false);
            }
        };
        if (user?.token) getConcerts();
    }, [user?.token]);

    return (
        <div className="min-vh-100 bg-light">
            {/* --- Navigation Bar --- */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
                <div className="container">
                    <Link className="navbar-brand fw-bold fs-4" to="/">🎵 ConcertPass</Link>

                    <div className="d-flex align-items-center gap-3">
                        {/* Welcome Message in Navbar */}
                        <span className="text-white opacity-75 d-none d-sm-inline">
                            Hi, <span className="fw-bold text-white">{user?.name || 'User'}</span>
                        </span>
                        <button className="btn btn-outline-danger btn-sm px-3 rounded-pill" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            <header className="bg-primary text-white py-5 mb-5 shadow-sm">
                <div className="container text-center py-3">
                    <h1 className="display-5 fw-bold mb-2">Welcome back, {user?.name || 'Friend'}!</h1>
                    <p className="lead opacity-75">Discover and book the hottest concerts of 2026.</p>
                </div>
            </header>

            {/* --- Main Content --- */}
            <main className="container pb-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold h4 m-0 text-dark">Trending Concerts</h2>
                    <span className="badge bg-secondary rounded-pill px-3">{concerts.length} Events Found</span>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status"></div>
                        <p className="mt-2 text-muted">Curating your experience...</p>
                    </div>
                ) : (
                    <div className="row g-4">
                        {concerts.length > 0 ? (
                            concerts.map((item) => (
                                <div className="col-lg-4 col-md-6" key={item.id || item._id}>
                                    <div className="card h-100 border-0 shadow-sm hover-up overflow-hidden transition-all">
                                        {/* Top Image Section */}
                                        <div className="position-relative" style={{ height: '200px' }}>
                                            <img
                                                src={`https://picsum.photos/seed/${item.id || item._id}/600/400`}
                                                className="w-100 h-100 object-cover"
                                                alt={item.concertName}
                                                loading="lazy"
                                                onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Concert+Image' }}
                                            />
                                            {/* Price Badge Overlay */}
                                            <span className="position-absolute top-0 start-0 m-3 badge bg-dark py-2 px-3 fs-6 shadow">
                                                ${item.price}
                                            </span>
                                            {/* Inventory Badge Overlay */}
                                            <span className={`position-absolute bottom-0 end-0 m-3 badge ${item.availTicket < 10 ? 'bg-danger' : 'bg-success'} shadow-sm`}>
                                                {item.availTicket} left
                                            </span>
                                        </div>

                                        {/* Card Content Section */}
                                        <div className="card-body d-flex flex-column p-4">
                                            <h5 className="fw-bold text-dark mb-2 text-truncate">{item.concertName}</h5>

                                            <div className="small text-muted mb-4">
                                                <div className="mb-1"><i className="bi bi-geo-alt-fill text-primary me-2"></i> {item.venue}</div>
                                                <div><i className="bi bi-calendar-check-fill text-primary me-2"></i> {item.date}</div>
                                            </div>

                                            <div className="mt-auto d-flex justify-content-end border-top pt-3">
                                                <Link
                                                    to={`/book/${item.id || item._id}`}
                                                    className="btn btn-primary btn-sm px-4 fw-bold rounded-pill shadow-sm py-2"
                                                >
                                                    Book Now
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center py-5 bg-white rounded shadow-sm">
                                <p className="text-muted mb-0">No upcoming concerts found. Check back soon!</p>
                            </div>
                        )}
                    </div>
                )}
            </main>

            <footer className="bg-white border-top py-4 mt-auto">
                <div className="container text-center">
                    <p className="text-muted small mb-0">© 2026 ConcertPass - Final Year MCA Project</p>
                </div>
            </footer>
        </div>
    );
}

export default checkAuth(App);