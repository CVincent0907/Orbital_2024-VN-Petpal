import React from "react";

export default function Address(props) {
    
    return (
        <>
            <label className="input-field-name" for="address">Address:</label>
            <div className="address">
            <input type="text" placeholder="Address line 1" id="address" name="address" onChange={(e) => props.address1(e.target.value)} required></input>
            <input type="text" placeholder="Address line 2" id="address" name="address" onChange={(e) => props.address2(e.target.value)}></input>
            <div className="postcode-city-field">
                <input type="text" placeholder="Postcode" id="address" name="address" onChange={(e) => props.postcode(e.target.value)} required></input>
                <input type="text" placeholder="City" id="address" name="address" onChange={(e) => props.city(e.target.value)} required></input>
            </div>
            <input type="text" placeholder="State" id="address" name="address" onChange={(e) => props.state(e.target.value)} required></input>
            </div>
        </>
    )
}