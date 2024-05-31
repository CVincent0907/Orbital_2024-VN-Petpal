import React from "react";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Sign from "./components/Sign";

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
