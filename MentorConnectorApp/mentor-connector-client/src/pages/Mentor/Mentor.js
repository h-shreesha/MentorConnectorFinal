import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeNavbar from '../../components/HomeNavbar';
import MentorSideNav from '../../components/MentorSideNav';
import Feedbacks from './Feedbacks';
import MenteeList from './MenteeList';
import MenteeRequests from './MenteeRequests';
import MentorChat from './MentorChat';
import MentorInfo from './MentorInfo';

import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

function Mentor() {

    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem("ISLOGIN") !== "valid") {
            navigate("/login");
        }
    }, []);

    return (
        <>
            <Header />
            <div className="container">
                <Routes>
                    <Route path="/" element={<MenteeRequests />} />
                    <Route path="/mentee" element={<MenteeList />} />
                    <Route path="/chat" element={<MentorChat />} />
                    <Route path="/feedback" element={<Feedbacks />} />
                    <Route path="/details" element={<MentorInfo />} />
                </Routes>
            </div>
        </>
    );
}

export default Mentor;