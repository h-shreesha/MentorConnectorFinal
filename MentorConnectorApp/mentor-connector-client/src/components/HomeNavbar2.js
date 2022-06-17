import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HomeNavbar2() {
    const navigate = useNavigate();

    const doLogout = () => {
        if (window.confirm("Are you sure want to Logout?") === true) {
            navigate("/");
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
            <div className="container">
                <div className="navbar-brand">Mentor Connector</div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link text-white active" aria-current="page" to="/mentor/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/mentee/mentor">Mentor</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/mentee/chat">Chat</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/mentee/feedback"> SendFeedback</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/mentee/details">Details</Link>
                        </li>
                    </ul>
                </div>
                <button type="button" className="btn btn-light" onClick={doLogout}>Logout</button>
            </div>
        </nav >
    );
}

export default HomeNavbar2;