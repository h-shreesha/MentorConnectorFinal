import React from "react";
import "../../components/homeContent/becomeInstructor.css";

function BecomeInstructor() {
  return (
    <div className="becomeInstructorDiv">
      <hr></hr>
      <div className="backgroundColorDiv"></div>
      <img
        src="https://media.istockphoto.com/photos/young-handsome-man-with-beard-wearing-casual-sweater-standing-over-picture-id1212702108?k=20&m=1212702108&s=612x612&w=0&h=ZI4gKJi2d1dfi74yTljf4YhulA1nfhD3dcUFGH-NUkY="
        alt="instructorImg"
        className="instructorImg"
      ></img>
      <div className="contentDiv">
        <h2 className="heading">Become a Mentor</h2>
        <p className="about">
          Top Mentors from around the world teach millions of students on Mentor
          Connector.{" "}
        </p>
        <div className="startTeching button">Start teaching today</div>
      </div>
    </div>
  );
}

export default BecomeInstructor;
