import React from "react";
import "./recommendations.css";
import RecommendedVideos from "./recommendedVideos";

function Recommendations() {
  return (
    <div className="recommendationsDiv">
      <div className="recommendations">
        
        <p>
          Choose from 1000 Mentors who are expert in their domains.
        </p>
        <h2>Top rated Mentors and their domains</h2>
        <RecommendedVideos />
      </div>
    </div>
  );
}

export default Recommendations;
