import React from "react";
import Navbar from "./Components/Navbar";
import RegisterForm2 from "./Components/RegisterForm2";

export default function RegisterPg2(props) {
    return (
        <div className="divider">
        <div className="content">
        <Navbar/>
        <br/>
        <br/>
        <br/>
        <RegisterForm2 userId={props.userId}/>
        </div>
        <div className="background-image"></div>
        </div>
    )
}