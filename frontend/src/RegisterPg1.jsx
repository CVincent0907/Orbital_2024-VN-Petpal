import React from "react";
import Navbar from "./components/Navbar";
import RegisterForm1 from "./components/RegisterForm1";

export default function RegisterPg1(props) {
    return (
        <div className="divider">
        <div className="content">
        <Navbar/>
        <br/>
        <br/>
        <br/>
        <RegisterForm1 userId={props.userId}/>
        </div>
        <div className="background-image"></div>
        </div>
    )
}