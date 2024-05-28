import React from "react";
import Navbar from "./Components/Navbar";
import RegisterForm from "./Components/RegisterForm";
import Sign from "./Components/Sign";

export default function RegisterPg(props) {
    return (
        <div className="divider">
        <div className="content">
        <Navbar/>
        <Sign className= "signUp" action="up"/>
        <RegisterForm setUserId={props.setUserId}/>
        </div>
        <div className="background-image"></div>
        </div>
    )
}