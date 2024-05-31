import React from "react";
import Navbar from "./components/Navbar";
import RegisterForm2 from "./components/RegisterForm2";

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