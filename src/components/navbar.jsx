import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = () => {
            const token = localStorage.getItem('authToken');
            setIsAuthenticated(!!token);
        };

        // Check on component mount
        checkAuthStatus();

        // Listen for storage changes (when login happens)
        window.addEventListener('storage', checkAuthStatus);
        
        // Also check periodically (for same-tab changes)
        const interval = setInterval(checkAuthStatus, 1000);

        return () => {
            window.removeEventListener('storage', checkAuthStatus);
            clearInterval(interval);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <nav className="navbar d-flex justify-con-spab">
            <div><img className="logo" src="https://recursionnitd.in/static/image/logoInverted.png" alt=""/></div>
            <div className="d-flex navlinks ">
                <Link className="links" to="/interview">Interview</Link>
                <Link className="links" to="/tasks">Tasks</Link>
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