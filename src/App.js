import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./Home";
import RegisterPg from "./RegisterPg";
import RegisterPg1 from "./RegisterPg1";
import RegisterPg2 from "./RegisterPg2";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<RegisterPg/>}/>
                <Route path="/registerPage1" element={<RegisterPg1/>}/>
                <Route path="/registerPage2" element={<RegisterPg2/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </Router>
    );
}

