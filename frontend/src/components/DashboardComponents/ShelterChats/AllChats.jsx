import React, { useContext, useEffect, useState } from "react";
import { ShelterContext } from "../../../utils/contexts/ShelterContext";
import { useNavigate, useLocation } from "react-router-dom";
import { ChatSearch } from "../../UserDashboard/Chats/ChatSearch";
import imagePlaceholder from "../../../assets/icons/image-placeholder.svg";

export function AllChats({ socket, messages }) {
    /* {
    other_id: <id>,
    name: "<name>",
    last_message: "<message>",
    img: <img>,
    role: ("USER" | "SHELTER")
    } */
    const id = useContext(ShelterContext).account.account_id;
    const navigate = useNavigate();
    const location = useLocation();
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const handleMessage = (e) => {
            const message = JSON.parse(e.data);
            updateChats(message);
        };
        socket.addEventListener("message", handleMessage);
        setChats(getChats(messages));
        return () => {
            socket.removeEventListener("message", handleMessage);
        };
    }, [messages])

    function getChats(messages) {
        const chats = [];
        messages.forEach(m => {
            const sent = m.sender_id == id;
            const other_id = sent ? m.receiver_id : m.sender_id;
            let unique = true;
            for (const chat of chats) {
                if (chat['other_id'] == other_id) {
                    unique = false;
                    break;
                }
            }
            if (unique) {
                const img = sent ? m.receiver_img : m.sender_img;
                chats.push({
                    'other_id': other_id,
                    'name': sent ? m.receiver_name : m.sender_name,
                    'last_message': m.data,
                    'img': img ? img : imagePlaceholder
                });
            }
        });
        console.log(chats);
        return chats;
    }

    function updateChats(message) {
        const sent = message.sender_id == id;
        const other_id = sent ? message.receiver_id : message.sender_id;
        const img = sent ? message.receiver_img : message.sender_img;
        const newChat = {
            'other_id': other_id,
            'name': sent ? message.receiver_name : message.sender_name,
            'last_message': message.data,
            'img': img ? img : imagePlaceholder
        };
        setChats((curr) => [newChat, ...curr.filter((m, i, arr) => m.other_id != other_id)]);
    }

    return (
        <div className="chat-allchats">
            <h2>Chats</h2>
            <ChatSearch />
            <ol className="chat-list">
                {chats.map((chat) => 
                    <li key={chat.other_id} 
                    className={`chat-listitem${location.pathname.endsWith(chat.other_id) ? " active" : ""}`} 
                    onClick={(e) => navigate(chat.other_id)}>
                        <img className="chat-avatar" src={chat.img} alt="avatar" />
                        <div className="chat-desc">
                            <h3>{chat.name}</h3>
                            <p>{chat.last_message.length > 40 ? chat.last_message.substring(0, 39) + "..." : chat.last_message}</p>
                        </div>
                    </li>
                )}
            </ol>
        </div>
    );
}