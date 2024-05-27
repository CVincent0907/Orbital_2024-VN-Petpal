import React from "react";
import Navbar from "./Components/Navbar";
import RegisterForm1 from "./Components/RegisterForm1";

export default function RegisterPg1() {
    return (
        <div className="divider">
        <div className="content">
        <Navbar/>
        <br/>
        <br/>
        <br/>
        <RegisterForm1/>
        </div>
        <div className="background-image"></div>
        </div>
    )
}