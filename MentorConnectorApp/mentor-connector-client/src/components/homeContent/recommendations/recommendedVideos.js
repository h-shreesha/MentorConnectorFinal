import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import "./recommendedVideos.css";
import VideoCard from "./videoCard";



function RecommendedVideos() {
  const [mentorList, setMentorList] = useState([]);

  const getAllMentor = () => {
    Axios.get("http://127.0.0.1:3001/allmentor")
      .then((response) => {
        setMentorList(response.data)
      });
  }

  useEffect(() => {
    getAllMentor()
  }, []);

  return (
    <div className="row row-cols-4 g-4">
      {
        mentorList.map((data, key) => {
          return (
            <div className="col">
              <VideoCard
                id={data._id}
                courseTitle={data.skill}
                imgSrc={
                  "http://127.0.0.1:3001/photos/" + data.photo
                }
                instructor={data.name}
                rating={data.rating}
                price={"years of experience: " + data.amount}
              />
            </div>
          );
        })
      }
      {/* <VideoCard
        courseTitle={" machine learning"}
        imgSrc={
          "https://media.istockphoto.com/photos/smiling-man-outdoors-in-the-city-picture-id1179420343?k=20&m=1179420343&s=612x612&w=0&h=G2UGMVSzAXGAQs3pFZpvWlHNRAzwPIWIVtSOxZHsEuc="
        }
        instructor={"Pritviraj"}
        rating={4.4}
        noOfStudents={"(1110)"}
        price={"₹5000"}
      /> */}
    </div>
  );
}

export default RecommendedVideos;
