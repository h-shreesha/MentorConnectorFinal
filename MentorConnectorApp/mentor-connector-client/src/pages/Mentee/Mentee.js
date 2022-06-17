import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeNavbar2 from '../../components/HomeNavbar2';
import MenteeSideNav from '../../components/MenteeSideNav';
import MenteeInfo from './MenteeInfo';
import MentorSearch from './MentorSearch';
import MentorList from './MentorList';
import Feedback from './Feedback';
import MenteeChat from './MenteeChat';

import Header from '../../components/Header';

import { useNavigate } from 'react-router-dom';

function Mentee() {

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
                    <Route path="/" element={<MentorSearch />} />
                    <Route path="/mentor" element={<MentorList />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/chat" element={<MenteeChat />} />
                    <Route path="/details" element={<MenteeInfo />} />
                </Routes>
            </div>
        </>
    );
}

export default Mentee;