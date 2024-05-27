import React from "react";
import Navbar from "./Components/Navbar";
import RegisterForm from "./Components/RegisterForm";
import Sign from "./Components/Sign";
export default function RegisterPg() {
    return (
        <div className="divider">
        <div className="content">
        <Navbar/>
        <Sign className= "signUp" action="up"/>
        <RegisterForm/>
        </div>
        <div className="background-image"></div>
        </div>
    )
}