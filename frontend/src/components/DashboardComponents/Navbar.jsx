import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import petpalSvg from "../../assets/DashboardIcon/PetPal logo.svg";
import imagePlaceholder from "../../assets/icons/image-placeholder.svg";
import axiosInstance from "../../utils/axiosInstance";
import { ShelterContext } from "../../utils/contexts/ShelterContext";
import ConfirmLogoutModal from './ConfirmLogoutModal';


export default function Navbar({ info }) {
    const shelterData = useContext(ShelterContext);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const navigate = useNavigate();

    // const handleLogoutClick = () => {
    //     setIsModalOpen(true);
    // };

    // const handleCancel = () => {
    //     setIsModalOpen(false);
    // };

    // const handleConfirm = async () => {
    //     axiosInstance.post('/api/auth/logout/')
    //     .then((res) => {
    //       // Assuming logout is successful
    //       alert(`Logout successful! Response data: ${JSON.stringify(res.data)}`);
    //       // Navigate to the appropriate page after logout
    //       navigate('/'); // Adjust the route as needed
    //     })
    //     .catch((error) => {
    //       alert("Error: " + error.message);
    //       console.error(error);
    //     });
    // }

    return (
        <nav className="navbar">
            <img className="side_icon" onClick={info.icon_onClick} src={info.icon_src} alt={info.icon_alt} />
            <img className="logo" src={petpalSvg} alt='petpal' />
            <h1>{info.title}</h1>
{/*             <button className="logout-button" onClick={handleLogoutClick}>Logout</button> */}
            <img className="profile" src={shelterData.profile_pic ? shelterData.profile_pic : imagePlaceholder} alt='profile' />
{/*             <ConfirmLogoutModal 
                isOpen={isModalOpen}
                onRequestClose={handleCancel}
                onConfirm={handleConfirm}
            /> */}
        </nav>
    );
}
