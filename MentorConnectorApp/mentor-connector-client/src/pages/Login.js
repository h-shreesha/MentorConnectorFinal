import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function Login() {

    const navigate = useNavigate();

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("0");

    var isValid = true;
    const [alertMsg, setAlertMsg] = useState("");

    const makeValidation = () => {
        if (phone === "") {
            isValid = false;
            setAlertMsg("Phone Number is required");
        }
        else if (password === "") {
            isValid = false;
            setAlertMsg("Password is required");
        }
        else {
            isValid = true;
        }
    }

    const doLogin = () => {
        makeValidation();
        if (isValid) {
            Axios.post('http://127.0.0.1:3001/login', {
                phone: phone,
                password: password,
                type: type,
            }).then((response) => {
                if (Object.keys(response.data).length > 0) {
                    sessionStorage.setItem("ID", response.data[0]._id);
                    sessionStorage.setItem("NAME", response.data[0].name);
                    sessionStorage.setItem("EMAIL", response.data[0].email);
                    sessionStorage.setItem("PHONE", response.data[0].phone);
                    sessionStorage.setItem("ISLOGIN", "valid");
                    if (parseInt(type) === 1) {
                        sessionStorage.setItem("TYPE", "mentee");
                    }
                    else {
                        sessionStorage.setItem("TYPE", "mentor");
                    }
                    navigate("/");
                }
                else {
                    setAlertMsg("Invalid Login Credentials");
                }
            });
        }
    }

    return (
        <>
            <Header />
            <div className="container bgg-img">
                <div className="d-flex justify-content-center align-items-center" style={{ 'height': '80vh' }}>
                    <div className="card w-50 p-3">
                        <div className="card-header bg-white">
                            <h5 className="text-dark fw-bold">Login</h5>
                        </div>
                        <div className="card-body">
                            {alertMsg ? <div className="alert alert-danger alert-msg-cst" role="alert">
                                {alertMsg}
                            </div> : ''}
                            <label className="mb-2">Contact Number</label>
                            <input type="text" className="form-control mb-3" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <label className="mb-2">Pasword</label>
                            <input type="password" className="form-control mb-3" value={password} onChange={(e) => setPassword(e.target.value)} />
                            {/* <Link to="/forgotpassword" className="text-end">Forgot Password?</Link>
                            <br /><br /> */}
                            <label className="mb-2">Account Type</label>
                            <select className="form-select mb-4" aria-label="Default select example" onChange={(e) => setType(e.target.value)}>
                                <option value="0">Mentor Account</option>
                                <option value="1">Mentee Account</option>
                            </select>
                            <button type="button" className="btn btn-secondary me-3" onClick={doLogin}>Login</button>
                            {/* <Link to="/register" className="text-dark">Register new Account</Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;