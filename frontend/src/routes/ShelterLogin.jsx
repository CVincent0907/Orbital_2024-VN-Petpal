import React from "react";
import LoginForm from "../components/User&ShelterRegisterLoginComponents/LoginForm";
import Navbar from "../components/User&ShelterRegisterLoginComponents/Navbar";
import Register from "../components/User&ShelterRegisterLoginComponents/Register";
import Sign from "../components/User&ShelterRegisterLoginComponents/Sign";

export default function ShelterLogin() {
    return (
            <div>
                <Navbar/>
                <Sign className="signIn" action="in" id="Shelter"/>
                <LoginForm role="SHELTER"/>
                <Register link="/shelterregister" />
            </div>
    );
}
