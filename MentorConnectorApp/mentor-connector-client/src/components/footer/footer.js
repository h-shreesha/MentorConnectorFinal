import React from "react";
import "../../components/footer/footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="upperDiv">
        <div className="linksContainer">
          <div className="linksDiv linksDiv1">
            
            <p>Teach on Mentor Connector</p>
            <p>Get the app</p>
            <p>About us</p>
            <p>Contact us</p>
          </div>
          <div className="linksDiv linksDiv2">
            <p>Careers</p>
            <p>Blog</p>
            <p>Help and Support</p>
            
            <p> </p>
          </div>
          <div className="linksDiv linksDiv3">
            <p>Terms</p>
            <p>Privacy policy and cookie policy</p>
            
            <p>Featured Mentors</p>
            <p> </p>
          </div>
        </div>
        <div className="linksDiv linksDiv4"></div>
      </div>
      <div className="lowerDiv">
        <img
          src="..//MentorConnectorLogo.png"
          className="MentorConnectorLogo"
          alt="logo"
        ></img>
        <div className="copyrightDiv">
          <p>© 2021 Mentor Connector.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
