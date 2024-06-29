import React from "react";

export function InputField({ id, label, type, placeholder, onChange, required=false, linebreak=false, value }) {
    return (
        <div className="inputfield">
            {label && <label htmlFor={id}>{label}</label>}{label && linebreak && <br />}
            <input type={type} value={value} placeholder={placeholder} id={id} onChange={onChange} required={required} />
        </div>
    );
}
