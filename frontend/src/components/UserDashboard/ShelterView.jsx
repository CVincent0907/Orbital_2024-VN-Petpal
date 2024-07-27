import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { ImagesDisplay } from '../ui/ImagesDisplay';
import Chat from "../../assets/icons/chat.svg";
import Email from "../../assets/icons/email.svg";
import Link from "../../assets/icons/link.svg";
import Location from "../../assets/icons/location.svg";
import Phone from "../../assets/icons/phone.svg";
import imagePlaceholder from "../../assets/icons/image-placeholder.svg";


export function ShelterView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [shelterData, setShelterData] = useState({});
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        axiosInstance.get(`/api/shelters/detail/${id}`)
        .then((res) => {
            setShelterData(res.data);
            if (!res.data.profile_pic) {
                setShelterData((data) => ({
                    ...data,
                    profile_pic: imagePlaceholder,
                }));
            }
            setCompleted(true);
            document.title = `View Shelter: ${shelterData.name}`;
        })
        .catch((error) => {
            alert("Error: " + error.Message)
            console.log(error)
        });
    }, []);

    if (!completed) {
        return;
    }
    return (
        <div className="shelterview-container">
            <div className="shelterview-profile">
                <img className="shelterview-profile-avatar" src={shelterData.profile_pic} alt="Shelter profile picture" />
                <div className="shelterview-profile-desc">
                    <div className="horizontal">
                        <h1 className="shelterview-profile-name">{shelterData.name}</h1>
                        <button className="chat-button" onClick={() => navigate(`/dashboard/chats/${shelterData.account.account_id}`)}>
                            <img className='chat-icon' src={Chat} alt="Chat icon" />
                            Chat
                        </button>
                    </div>
                    <p className="profile-description">{shelterData.description}</p>
                </div>
            </div>
            <hr />
            <div className="shelterview-gallery">
                <h2>Photos &amp; videos</h2>
                <ImagesDisplay images={shelterData.images} />
            </div>
            <hr />
            <div className="shelterview-contact">
                {shelterData.address &&
                    <div className="shelterview-contact-item contact-address">
                        <img className="contact-icon" src={Location} alt="location icon" />
                        <div className="contact-details">
                            <p>{shelterData.address.address_line_1}</p>
                            <p>{shelterData.address.address_line_2}</p>
                            <p>{shelterData.address.postcode}, {shelterData.address.city}</p>
                            <p>{shelterData.address.state}</p>
                            <p>{shelterData.address.country}</p>
                        </div>
                    </div>
                }
                {shelterData.link &&
                    <div className="shelterview-contact-item">
                        <img className="contact-icon" src={Link} alt="web-link icon" />
                        <a href={shelterData.link}>{shelterData.link}</a>
                    </div>
                }
                {shelterData.contact_email &&
                    <div className="shelterview-contact-item">
                        <img className="contact-icon" src={Email} alt="email icon" />
                        <p>{shelterData.contact_email}</p>
                    </div>
                }
                {shelterData.phone_number &&
                    <div className="shelterview-contact-item">
                        <img className="contact-icon" src={Phone} alt="phone icon" />
                        <p>{shelterData.phone_number}</p>
                    </div>
                }
            </div>
        </div>
    );
}