import React from "react";
import Navbar from "../components/User&ShelterRegisterLoginComponents/Navbar";
import RegisterForm from "../components/User&ShelterRegisterLoginComponents/RegisterForm";
import Sign from "../components/User&ShelterRegisterLoginComponents/Sign";

export default function RegisterPg(props) {
    return (
        <div className="divider">
        <div className="content1">
        <Navbar/>
        <Sign className= "signUp" action="up" id="Shelter" />
        <RegisterForm setUserId={props.setUserId}/>
        </div>
        <div className="background-image"></div>
        </div>
    )
}