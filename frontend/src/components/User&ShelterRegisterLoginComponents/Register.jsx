import React from "react";
import { Link } from "react-router-dom";

export default function Register(props) {

    return (<div className="registerLine">
    <h4 className="ask">Don't have an account yet?</h4>
     <Link to={props.link} className="register">Register for free</Link>
    </div>)
}