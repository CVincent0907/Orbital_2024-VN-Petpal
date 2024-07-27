import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import petpalLogo from "../../assets/PetPal-logo.svg";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../utils/contexts/UserContext";
import ConfirmLogoutModal from './ConfirmLogoutModal'; // Import the modal component

export function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userData = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleConfirm = async () => {
        axiosInstance.post('/api/auth/logout/')
        .then((res) => {
          alert(`Logout successful! Response data: ${JSON.stringify(res.data)}`);
          // Navigate to homepage after logout
          navigate('/'); 
        })
        .catch((error) => {
          alert("Error: " + error.message);
          console.error(error);
        });
    }

    return (
        <nav className="navbar">
            {/* <img className="navbar-icon" src={moreIcon} alt="more icon"></img> */}
            <img className="navbar-logo" src={petpalLogo} alt="PetPal logo"></img>
            <button className="logout-button" onClick={handleLogoutClick}>Logout</button>
            <img className="navbar-profile" src={userData.profile_pic} alt="profile picture"></img>
            <ConfirmLogoutModal 
                isOpen={isModalOpen}
                onRequestClose={handleCancel}
                onConfirm={handleConfirm}
            />
        </nav>
    );
}
