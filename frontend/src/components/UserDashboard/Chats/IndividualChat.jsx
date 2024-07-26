import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";

export function IndividualChat({ socket }) {
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const handleMessage = (e) => {
            const data = JSON.parse(e.data);
            setMessages((curr) => [...curr, data])
        };
        socket.addEventListener("message", handleMessage);

        axiosInstance.get(`/api/chat/${id}`)
        .then((res) => {
            console.log(res);
            setMessages([...res.data.messages].reverse());
        })
        .catch((error) => {
            alert("Error: " + error.Message);
            console.log(error);
        });

        return () => {
            socket.removeEventListener("message", handleMessage);
        };
    }, [])

    const handleSend = (e) => {
        socket.send(JSON.stringify({
            "data": message,
            "receiver_id": id
        }));
        setMessages((curr) => [...curr, {'data': message}]);
        setMessage("");
    };

    return (
        <div>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={handleSend}>send</button>
        {messages.length == 0
            ? <p>no messages with this account.</p>
            : messages.map((m) => <p>{m.data}</p>)
        }
        </div>
    );
}