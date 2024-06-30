import React from "react";
import { Route, Routes } from "react-router-dom";

import MenuPg from "./routes/MenuPg";
import ShelterRegister from "./routes/ShelterRegister";
import ShelterLogin from "./routes/ShelterLogin";
import UserLogin from "./routes/UserLogin";
import UserRegisterPg from "./routes/UserRegisterPg";
// UserDashboard
import UserDashboard from "./routes/UserDashboard";
import { PetsList } from "./components/UserDashboard/PetsList";
import { PetView } from "./components/UserDashboard/PetView";
import { SheltersList } from "./components/UserDashboard/SheltersList";
import { ShelterView } from "./components/UserDashboard/ShelterView";
import { Chats as UserChats } from "./components/UserDashboard/Chats";
import { ProfileEdit } from "./components/UserDashboard/ProfileEdit";
// ShelterDashboard
import ShelterDashboard from "./routes/ShelterDashboard";
import { PetEdit } from "./routes/PetEdit";
import PetCreate from "./components/DashboardComponents/PetCreate";
import { ListedAnimals } from "./components/DashboardComponents/ListedAnimals";
import { ShelterEdit } from "./components/DashboardComponents/ShelterEdit";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<MenuPg />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegisterPg />}/>
            <Route path="/dashboard" element={<UserDashboard />}>
                <Route path="pets" element={<PetsList />} />
                <Route path="pets/:id" element={<PetView />} />
                <Route path="shelters" element={<SheltersList />} />
                <Route path="shelters/:id" element={<ShelterView />} />
                <Route path="chats" element={<UserChats />} />
                <Route path="profile" element={<ProfileEdit />} />
            </Route>
            <Route path="/shelter">
                <Route path="login" element={<ShelterLogin />} />
                <Route path="register" element={<ShelterRegister />} />
                <Route path="dashboard" element={<ShelterDashboard />} >
                    <Route path="list" element={<ListedAnimals />} />
                    <Route path="add" element={<PetCreate />} />
                    <Route path="edit/:id" element={<PetEdit />} />
                    <Route path="profile" element={<ShelterEdit />} />
                </Route>
            </Route>
        </Routes>
    );
}

