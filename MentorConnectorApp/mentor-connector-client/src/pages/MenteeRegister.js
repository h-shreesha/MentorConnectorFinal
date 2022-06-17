import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Axios from 'axios';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

function MenteeRegister() {

    const navigate = useNavigate();

    const API = "";

    const [autoGenOtp, setAutoGenOtp] = useState(Math.floor(1000 + Math.random() * 9999));

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [gender, setGender] = useState("Male");
    const [age, setAge] = useState("");
    const [classField, setClassField] = useState("1");

    var isValid = true;
    const [alertMsg, setAlertMsg] = useState("");

    const makeValidation = () => {
        if (name === "") {
            isValid = false;
            setAlertMsg("Name is required");
        }
        else if (!/.+@.+\.[A-Za-z]+$/.test(email)) {
            isValid = false;
            setAlertMsg("Invalid Email Address");
        }
        else if (phone.length < 10) {
            isValid = false;
            setAlertMsg("Invalid Phone Number");
        }
        else if (parseInt(otp) !== parseInt(autoGenOtp)) {
            isValid = false;
            setAlertMsg("Enter Valid OTP");
        }
        else if (password === "") {
            isValid = false;
            setAlertMsg("Password is required");
        }
        else if (password !== cpassword) {
            isValid = false;
            setAlertMsg("Password not Matching");
        }
        else if (age === "") {
            isValid = false;
            setAlertMsg("Age is required");
        }
        else {
            isValid = true;
        }
    }

    const createAccount = () => {
        makeValidation();
        if (isValid) {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("password", password);
            formData.append("gender", gender);
            formData.append("age", age);
            formData.append("classField", classField,);

            Axios.post('http://127.0.0.1:3001/menteeregister',
                formData
            ).then((response) => {
                if (response.data === "error") {
                    setAlertMsg("Email/ Phone Number Already Exist");
                }
                else if (response.data === "success") {
                    alert("Registered Successfully");
                    navigate('/');
                }
            });
        }
    }

    const sendOTP = () => {
        if (phone === "") {
            setAlertMsg("Invalid Phone Number");
        }
        else {
            var My_otp = Math.floor(1000 + Math.random() * 9999)
            setAutoGenOtp(My_otp);
            console.log(My_otp);
            Axios.get("https://2factor.in/API/V1/" + API + "/SMS/+91" + phone + "/" + My_otp)
                .then((response) => {
                    console.log(response);
                });
        }
    }

    return (
        <>
            <Header />
            <div className="container bgg-img">
                <div className="d-flex justify-content-center my-5">
                    <div className="card w-75 mt-3 p-3">
                        <div className="card-header bg-white">
                            <h5 className="text-dark fw-bold">Create New Account</h5>
                        </div>
                        <div className="card-body">
                            <div className="row g-3">
                                {alertMsg ? <div className="col-12"><div className="alert alert-danger alert-msg-cst" role="alert">
                                    {alertMsg}
                                </div> </div> : ''}
                                <div className="col-12">
                                    <label className="mb-2">Full Name</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="col-6">
                                    <label className="mb-2">Email Address</label>
                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="col-6">
                                    <label className="mb-2">Contact Number</label>
                                    <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="col-9">
                                    <label className="mb-2">OTP</label>
                                    <input type="number" className="form-control" value={otp} onChange={(e) => setOtp(e.target.value)} />
                                </div>
                                <div className="col-3 text-center mt-auto">
                                    <button type="button" className="btn btn-warning" onClick={sendOTP}>Send OTP</button>
                                </div>
                                <div className="col-6">
                                    <label className="mb-2">Pasword</label>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="col-6">
                                    <label className="mb-2">Conform Pasword</label>
                                    <input type="password" className="form-control" value={cpassword} onChange={(e) => setCPassword(e.target.value)} />
                                </div>
                                <div className="col-6">
                                    <label className="mb-2">Gender</label>
                                    <select className="form-select" aria-label="Default select example" onChange={(e) => setGender(e.target.value)}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div className="col-6">
                                    <label className="mb-2">Age</label>
                                    <input type="number" min="1" max="100" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
                                </div>
                                <div className="col-6">
                                    <label className="mb-2">Semester</label>
                                    <select className="form-select" aria-label="Default select example" onChange={(e) => setClassField(e.target.value)}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        {/* <option value="9">9</option>
                                        <option value="10">10</option> */}
                                    </select>
                                </div>
                                <div className="col-12">
                                    <button type="button" className="btn btn-secondary" onClick={createAccount}>Register</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MenteeRegister;