import React from "react";
import Navbar from "../components/User&ShelterRegisterLoginComponents/Navbar";
import UserRegisterForm from "../components/User&ShelterRegisterLoginComponents/UserRegisterForm";

export default function UserRegisterPg() {

        return (
            <div className="divider">
                <div className="content1">
                <Navbar/>
                <UserRegisterForm/> </div>
                <div className="background-image1"></div>
            </div>
        )
    
}