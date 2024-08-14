import React, { useEffect, useState } from "react";
import { Route, Routes, useParams } from 'react-router-dom';
import axiosInstance from "../../../utils/axiosInstance";
import { AllChats } from "./AllChats";
import { IndividualChat } from "./IndividualChat";


export function Chats() {
    /* {
    other_id: <id>,
    name: "<name>"
    last_message: "<message>"
    img: <img>
    } */
    const [messages, setMessages] = useState([]);
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/chat/");

    useEffect(() => {
        const handleSocketOpen = (e) => {
            console.log("Websocket connection opened");
        };
        socket.addEventListener("open", handleSocketOpen);
        axiosInstance.get(`/api/chat/`)
        .then((res) => {
            console.log(res);
            setMessages(res.data.messages);
        })
        .catch((error) => {
            alert("Error: " + error.Message);
            console.log(error);
        });
        return () => {
            socket.removeEventListener("open", handleSocketOpen);
        };
    }, []);

    return (
        <div className="chat-container">
            <AllChats socket={socket} messages={messages} />
            <Routes>
                <Route path="" element={<EmptyChat />} />
                <Route path=":id" element={<IndividualChat socket={socket} />} />
            </Routes>
        </div>
    );
}

function EmptyChat() {
    return (
        <div className="indvchat-container">
            <p>Select a user to start chatting!</p>
        </div>
    );
}