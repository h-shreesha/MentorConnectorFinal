import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';

function MentorSearch() {

    let { skill } = useParams();

    const navigate = useNavigate();

    const [mentorSearchList, setMentorSearchList] = useState([]);

    useEffect(() => {
        searchMentor();
    }, [skill]);

    const searchMentor = () => {
        Axios.post('http://127.0.0.1:3001/searchmentor', {
            skill: skill,
        }).then((response) => {
            setMentorSearchList(response.data);
            console.log(response.data)
        });
    }

    const doRequest = (mentor) => {
        if (sessionStorage.getItem("ISLOGIN") !== "valid") {
            navigate("/login");
        }
        else {
            Axios.post('http://127.0.0.1:3001/dorequest', {
                mentor: mentor,
                mentee: sessionStorage.getItem("ID"),
                status: 0,
            }).then((response) => {
                if (response.data === "success") {
                    alert("Request Sent");
                }
                else {
                    alert("Already Sent");
                }
            });
        }
    }

    return (
        <>
            <Header />
            <div className="row g-5 p-5">
                <div className="col-12">
                    <h3>Result For {skill}</h3>
                </div>
                <div className="col-12">
                    <div className="row row-cols-4">
                        {
                            mentorSearchList.map((data, key) => {
                                return (
                                    <div class="col">
                                        <div class="card h-100">
                                            <img src={"http://127.0.0.1:3001/photos/" + data.photo} style={{ 'height': '200px' }} />
                                            <div class="card-body">
                                                <h3 className="p-0 m-0">{data.name}</h3>
                                                <p className="p-0 m-0">{data.email}</p>

                                                <p><i>
                                                    {Array.from({ length: Math.floor(data.rating) }, (_, i) =>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill text-warning me-1" viewBox="0 0 16 16">
                                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                        </svg>)
                                                    }
                                                </i></p>
                                            </div>
                                            <div className="card-footer">
                                                <button type="button" className="btn btn-primary w-100" onClick={() => doRequest(data._id)}>Request</button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default MentorSearch;