import React from "react";
import { Route, Routes } from "react-router-dom";
import ShelterDashboard from "./routes/ShelterDashboard";
import MenuPg from "./routes/MenuPg";
import ShelterRegister from "./routes/ShelterRegister";
import ShelterLogin from "./routes/ShelterLogin";
import UserLogin from "./routes/UserLogin";
import UserRegisterPg from "./routes/UserRegisterPg";
import UserDashboard from "./routes/UserDashboard";
import { PetEdit } from "./routes/PetEdit";
import PetCreate from "./components/DashboardComponents/PetCreate";
import { ListedAnimals } from "./components/DashboardComponents/ListedAnimals";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<MenuPg />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegisterPg />}/>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/shelter">
                <Route path="login" element={<ShelterLogin />} />
                <Route path="register" element={<ShelterRegister />} />
                <Route path="dashboard" element={<ShelterDashboard />} >
                    <Route path="list" element={<ListedAnimals />} />
                    <Route path="add" element={<PetCreate />} />
                    <Route path="edit/:id" element={<PetEdit />} />
                </Route>
            </Route>
        </Routes>
    );
}

