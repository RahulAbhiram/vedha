import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <nav className="navbar d-flex justify-con-spab">
            <div><img className="logo" src="https://recursionnitd.in/static/image/logoInverted.png" alt=""/></div>
            <div className="d-flex navlinks ">
                <Link className="links" to="/interview">Interview</Link>
                <Link className="links" to="/exp">Experience</Link>
                <Link className="links" to="/ev">Events</Link>
                <Link className="links" to="/gs">Getting Started</Link>
                <Link className="links" to="/team">Team</Link>
                {isAuthenticated ? (
                    <>
                        <Link className="links" to="/dashboard">Dashboard</Link>
                        <button onClick={handleLogout} className="links logout-nav-btn">Logout</button>
                    </>
                ) : (
                    <Link className="links" to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
};
export default Navbar;