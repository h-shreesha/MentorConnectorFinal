import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import User from './User';

function AdminPanel() {
    const navigate = useNavigate();

    const doLogout = () => {
        if (window.confirm("Are you sure want to Logout?") === true) {
            navigate("/");
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                <div className="container">
                    <div className="navbar-brand">Mentor Connector</div>
                    <button type="button" className="btn btn-light" onClick={doLogout}>Logout</button>
                </div>
            </nav >
            <Routes>
                <Route path="/" element={<User />} />
                {/* <Route path="/products" element={<ManageProduct />} />
                <Route path="/feedbacks" element={<AdminFeedback />} />
                <Route path="/staffs" element={<ManageStaff />} /> */}
            </Routes>
        </>
    );
}

export default AdminPanel;