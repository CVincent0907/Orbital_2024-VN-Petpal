import React from "react";
import LoginForm from "./Components/LoginForm";
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import Sign from "./Components/Sign";

export default function Home() {
    return (
            <div>
                <Navbar/>
                <Sign className="signIn" action="in"/>
                <LoginForm/>
                <Register/>
            </div>
    );
}
