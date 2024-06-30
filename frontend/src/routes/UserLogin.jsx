import React from "react";
import LoginForm from "../components/User&ShelterRegisterLoginComponents/LoginForm";
import Navbar from "../components/User&ShelterRegisterLoginComponents/Navbar";
import Register from "../components/User&ShelterRegisterLoginComponents/Register";
import Sign from "../components/User&ShelterRegisterLoginComponents/Sign";

export default function Home() {
    return (
        <div className="login-main">
            <Navbar/>
            <div className="login-content">
                <Sign className="signIn" action="in" id="User"/>
                <LoginForm role="USER"/>
                <Register link="/register" />
            </div>
        </div>
    );
}
