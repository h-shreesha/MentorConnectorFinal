import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../components/header/headerPrimary.css";
// import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
// import SearchOutlinedIcon from "@mui/material/icons/SearchOutlined";

function HeaderPrimary() {

  const navigate = useNavigate();

  const [searchInp, setSearchInp] = useState("");

  const doLogout = () => {
    if (window.confirm("Are you sure want to Logout?") === true) {
      sessionStorage.clear();
      navigate("/");
    }
  }

  return (
    <div className="headerPrimary">
      <div className="left part">
        <Link to="/" className="udemyLogo">
          <img src={process.env.PUBLIC_URL + '/MentorConnectorLogo.png'} className="logo" alt="logo"></img>
        </Link>
        {/* <div className="categoriesDiv">
          <span className="categories">Categories</span>
        </div> */}
      </div>
      <div className="mid part">
        {sessionStorage.getItem("TYPE") !== "mentor" ? <>
          <input className="searchBar" value={searchInp} onChange={(e) => setSearchInp(e.target.value)} placeholder="Search for Mentors"></input>
          <Link to={"/mentorsearch/" + searchInp} className="btn btn-outline-primary btn-sm">Search</Link>
        </>
          : ''}

      </div>
      <div className="right part">

        {/* <div className="teachDiv">
          <span className="teach">{sessionStorage.getItem("EMAIL")}</span>
        </div> */}
        <div className="businessDiv">
          {sessionStorage.getItem("TYPE") == "mentor" ? <Link to="/mentor/feedback/" className="teach" style={{ 'textDecoration': 'none' }}>Feedbacks</Link>
            : ''}
        </div>
        <div className="businessDiv">
          {sessionStorage.getItem("TYPE") == "mentee" ? <Link to="/mentee/feedback/" className="teach" style={{ 'textDecoration': 'none' }}>Send Feedbacks</Link>
            : ''}
        </div>
        <div className="businessDiv">
          {sessionStorage.getItem("TYPE") == "mentor" ? <Link to="/mentor/chat/" className="teach" style={{ 'textDecoration': 'none' }}>Open Discussion</Link>
            : ''}
        </div>
        <div className="businessDiv">
          {sessionStorage.getItem("TYPE") == "mentee" ? <Link to="/mentee/chat/" className="teach" style={{ 'textDecoration': 'none' }}>Open Discussion</Link>
            : ''}
        </div>
        <div className="businessDiv">
          {sessionStorage.getItem("TYPE") == "mentor" ? <Link to="/mentor/" className="signup button">Requests</Link>
            : ''}
        </div>
        <div className="cartDiv">
          {/* <ShoppingCartOutlinedIcon className="icon" /> */}
        </div>
        {sessionStorage.getItem("ISLOGIN") !== "valid" ? <Link to="/login" className="login button">LogIn</Link>
          : <button type="button" className="login button" onClick={doLogout}>Logout</button>}
        {sessionStorage.getItem("ISLOGIN") !== "valid" ? <Link to="/mentorregister" className="signup button">Mentor</Link>
          : ''}
        {sessionStorage.getItem("ISLOGIN") !== "valid" ? <Link to="/menteeregister" className="signup button">Mentee</Link>
          : ''}

      </div>
    </div>
  );
}

export default HeaderPrimary;
