import React from "react";

export default function InputField(props) {
    return (
        
        <>
        <label className="input-field-name" for={props.id}>{props.name}:</label>
        <input type={props.type} placeholder={props.placeholder} id={props.id} name={props.name} autoFocus={props.autoFocus} onChange={props.change} required />
        <br/><br/><br/>
        </>
        
    )
}