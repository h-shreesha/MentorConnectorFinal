import React from "react";
import "./featureDiv2.css";
import FeatureCard from "./featureCard";
// import AccessTimeIcon from "@material-ui/icons/AccessTime";
// import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
// import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";

function Feature2() {
  return (
    <div className="featureDiv2">
      {/* <FeatureCard
        // icon={<AccessTimeIcon className="icon" />}
        heading={"Go at your own pace"}
        para={"Enjoy lifetime access to courses on Mentor Connector Website."}
      /> */}
      <FeatureCard
        // icon={<EmojiPeopleIcon className="icon" />}
        heading={"Learn from industry experts"}
        para={"Select from top instructors"}
      />
      <FeatureCard
        // icon={<VideoLibraryIcon className="icon" />}
        heading={"Find Mentors on almost any domain"}
        para={"Build your library for your career and personal growth"}
      />
    </div>
  );
}

export default Feature2;
