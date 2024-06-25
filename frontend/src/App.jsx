import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddAnimalPg from "./routes/AddAnimalPg";
import Dashboard from "./routes/Dashboard(without logout)";
import MenuPg from "./routes/MenuPg";
import RegisterPg from "./routes/RegisterPg";
import ShelterLogin from "./routes/ShelterLogin";
import UserLogin from "./routes/UserLogin";
import UserRegisterPg from "./routes/UserRegisterPg";
import UserRegisterPg1 from "./routes/UserRegisterPg1";

export default function App() {
    const [userId, setUserId] = useState(null);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MenuPg/>}/>
                <Route path="/dashboard/add" element={<AddAnimalPg/>}/>
                <Route path="/userlogin" element={<UserLogin/>}/>
                <Route path="/shelterlogin" element={<ShelterLogin/>}/>
                <Route path="/shelterregister" element={<RegisterPg setUserId={setUserId}/>}/>
                {/* <Route path="/shelterregisterPage1" element={<RegisterPg1 userId={userId}/>}/>
                <Route path="/shelterregisterPage2" element={<RegisterPg2 userId={userId}/>}/> */}
                <Route path="/userregister" element={<UserRegisterPg setUserId={setUserId}/>}/>
                <Route path="/userregisterPage1" element={<UserRegisterPg1 setUserId={setUserId}/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </Router>
    );
}

