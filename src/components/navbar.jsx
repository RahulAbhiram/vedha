import { Link } from "react-router-dom";

const Navbar =()=>{
    return (<nav className="navbar d-flex justify-con-spab">
    <div><img className="logo" src="https://recursionnitd.in/static/image/logoInverted.png" alt=""/></div>
    <div className="d-flex navlinks ">
        <Link className="links" to="/interview">Interview</Link>
        <Link  className="links" to="/exp">Experience</Link>
        <Link  className="links" to="/ev">Events</Link>
        <Link  className="links" to="/gs">Getting Started</Link>
        <Link  className="links" to="/team">Team</Link>
        <Link  className="links" to="/login">Login</Link>
        </div>
</nav>)
}
export default Navbar;