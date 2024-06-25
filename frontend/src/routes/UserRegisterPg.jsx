import React from "react";
import Navbar from "../components/User&ShelterRegisterLoginComponents/Navbar";
import Sign from "../components/User&ShelterRegisterLoginComponents/Sign";
import UserRegisterForm from "../components/User&ShelterRegisterLoginComponents/UserRegisterForm";

export default function UserRegisterPg() {

        return (
            <div className="divider">
            <div className="content1">
            <Navbar/>
            <Sign className= "signUp" action="up" id="User"/>
            {/* <RegisterForm setUserId={props.setUserId}/> */}
            <UserRegisterForm/> </div>
            <div className="background-image1"></div>
            </div>
        )
    
}