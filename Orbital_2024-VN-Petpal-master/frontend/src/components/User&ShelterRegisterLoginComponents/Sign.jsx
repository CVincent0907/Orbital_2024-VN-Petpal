import React from "react";

export default function SignIn(props) {

    return (
        <h1 className={props.className}>Sign {props.action} as <b className="boldShelter">{props.id}</b></h1>
    )

}