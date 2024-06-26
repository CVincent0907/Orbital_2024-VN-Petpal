import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../../assets/MenuPgIcon/menupgImg.svg";
import List from "./List";

export default function Body() {
    const navigate = useNavigate();

    const onClick = (e) => {
        navigate('/userregister')
    }

    return (
        <div>
            <div className="menupgbody">
                <div className="menupgheader">
                    <h1>Adopting pets</h1>
                    <h1>made easy</h1>
                    <List/>
                </div>
                <div>
                    <img className="menupgimg" src={img}></img>
                </div>
            </div>
            <button onClick={onClick} className="menupgregister">Register</button>    
        </div>
    )


}