import PropTypes from 'prop-types';
import React from "react";

export default function InputField(props) {
    return (
        <div>
            <label className="input-field-name" for={props.id}>{props.name}</label>
            <input type={props.type} placeholder={props.placeholder} id={props.id} name={props.name} autoFocus={props.autoFocus} onChange={props.change} required={props.required} />
        </div>
    );
}
