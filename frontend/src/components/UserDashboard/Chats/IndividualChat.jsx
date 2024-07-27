import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { ProfileCard } from "./ProfileCard";
import sendIcon from "../../../assets/icons/send.svg";

export function IndividualChat({ socket }) {
    /* {
    id: id
    data: "data"
    sent: boolean
    } */
    const { id } = useParams();
    const messagesBottomRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    function scrollToBottom() {
        messagesBottomRef.current.scrollIntoView();
    }

    function formatMessage(message) {
        const sent = message.receiver_id == id;
        return {'id': message.id, 'data': message.data, 'sent': sent};
    }

    useEffect(() => {
        const handleMessage = (e) => {
            console.log(e);
            const data = JSON.parse(e.data);
            setMessages((curr) => [...curr, formatMessage(data)]);
        };
        socket.addEventListener("message", handleMessage);

        axiosInstance.get(`/api/chat/${id}`)
        .then((res) => {
            setMessages([...res.data.messages.map(formatMessage)].reverse());
        })
        .catch((error) => {
            console.log(error);
        });

        return () => {
            socket.removeEventListener("message", handleMessage);
        };
    }, [id])

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        const newMessage = message.trim();
        if (newMessage.trim() !== "") {
            socket.send(JSON.stringify({
                "data": newMessage,
                "receiver_id": id
            }));
        }
        setMessage("");
    };

    return (
        <div className="indvchat-container">
            <ProfileCard id={id} />
            <div className="indvchat-list">
                {messages.length == 0
                    ? <p>no messages with this account.</p>
                    : messages.map((m) => <p className={m.sent ? "sent" : "received"} key={m.id}>{m.data}</p>)
                }
                <div ref={messagesBottomRef} />
            </div>
            <div className="indvchat-input-wrapper">
                <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Aa" />
                <img src={sendIcon} alt="send button" onClick={handleSend} />
            </div>
        </div>
    );
}