import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AddAnimalPg from "./routes/AddAnimalPg";
import ShelterDashboard from "./routes/ShelterDashboard";
import MenuPg from "./routes/MenuPg";
import ShelterRegister from "./routes/ShelterRegister";
import ShelterLogin from "./routes/ShelterLogin";
import UserLogin from "./routes/UserLogin";
import UserRegisterPg from "./routes/UserRegisterPg";
import UserDashboard from "./routes/UserDashboard";

export default function App() {
    const [userId, setUserId] = useState(null);
    return (
        <Routes>
            <Route path="/" element={<MenuPg/>}/>
            <Route path="/login" element={<UserLogin/>}/>
            <Route path="/register" element={<UserRegisterPg setUserId={setUserId}/>}/>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/shelter">
                <Route path="login" element={<ShelterLogin/>}/>
                <Route path="register" element={<ShelterRegister setUserId={setUserId}/>}/>
                <Route path="dashboard" element={<ShelterDashboard/>}/>
                <Route path="dashboard/add" element={<AddAnimalPg/>}/>
            </Route>
        </Routes>
    );
}

