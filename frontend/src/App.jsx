import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./Home";
import RegisterPg from "./RegisterPg";

export default function App() {
    const [userId, setUserId] = useState(null);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<RegisterPg setUserId={setUserId}/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </Router>
    );
}

