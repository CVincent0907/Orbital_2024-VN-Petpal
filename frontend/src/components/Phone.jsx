import React from "react";

export default function Phone(props) {
    return (
        <div className="phone-section">
        <label for="phone">Telephone:</label>
        <div className="phone">
        <select className="select-country-code" id="phone" name="phone" onChange={(e) => props.code(e.target.value)} required>
            <option value="" disabled selected>Select</option>
            <option value="+65">+65</option>
            {/*<option value="+60">+60</option>*/}
        </select>
        <input type="tel" id="phone" name="number" placeholder="phone" onChange={(e) => props.phone(e.target.value)} required></input>
        </div>
        </div>   
)
    
}