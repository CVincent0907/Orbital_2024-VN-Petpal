import React from "react";
import Navbar from "../components/User&ShelterRegisterLoginComponents/Navbar";
import RegisterForm from "../components/User&ShelterRegisterLoginComponents/ShelterRegisterForm";
import Sign from "../components/User&ShelterRegisterLoginComponents/Sign";

export default function ShelterRegister(props) {
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