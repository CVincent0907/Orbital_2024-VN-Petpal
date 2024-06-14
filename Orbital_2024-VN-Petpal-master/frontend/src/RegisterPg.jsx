import React from "react";
import Navbar from "./components/Navbar";
import RegisterForm from "./components/RegisterForm";
import Sign from "./components/Sign";

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