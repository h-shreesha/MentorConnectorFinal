import React, { useState } from 'react';
import Axios from 'axios';
import "./videoCard.css";
import { useNavigate } from 'react-router-dom';
// import StarIcon from "@material-ui/icons/Star";
// // import StarBorderIcon from "@material-ui/icons/StarBorder";
// import StarHalfIcon from "@material-ui/icons/StarHalf";

function VideoCard(props) {

  const navigate = useNavigate();

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
    <div className="videoCard">
      <img className="courseImg" src={props.imgSrc} alt="courseImg"></img>
      <h3>{props.courseTitle}</h3>
      <p>{props.instructor}</p>
      <div className="ratingDiv">
        <span className="rating">{Array.from({ length: Math.floor(props.rating) }, (_, i) =>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill text-warning me-1" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>)
        }</span>
        <span className="stars">
          {/* <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarHalfIcon /> */}
        </span>
        {/* <span className="noOfStudents">{props.noOfStudents}</span> */}
      </div>
      <h3 className="price">{props.price}</h3>
      {sessionStorage.getItem("TYPE") !== "mentor" ? <button className="btn btn-secondary btn-sm w-75 mt-2" onClick={() => doRequest(props.id)}>Request</button> : ''}
      {/* <div className="bestsellerBadge">Bestseller</div> */}
    </div>
  );
}

export default VideoCard;
