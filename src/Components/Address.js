import React from "react";

export default function Address(props) {
    
    return (
        <>
            <label className="input-field-name" for="address">Address:</label>
            <div className="address">
            <input type="text" placeholder="Street (Required)" id="address" name="address" onChange={(e) => props.address(e.target.value)} required></input>
            <input type="text" placeholder="Street (Optional)" id="address" name="address" onChange={(e) => props.optional(e.target.value)}></input>
            <div className="postcode-city-field">
                <input type="number" placeholder="Postcode" id="address" name="address" onChange={(e) => props.postcode(e.target.value)} required></input>
                <input type="text" placeholder="City" id="address" name="address" onChange={(e) => props.city(e.target.value)} required></input>
            </div>
            <input type="text" placeholder="State" id="address" name="address" onChange={(e) => props.state(e.target.value)} required></input>
            </div>
        </>
    )
}