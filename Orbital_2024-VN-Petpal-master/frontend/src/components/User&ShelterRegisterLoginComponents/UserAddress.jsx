import React from "react";

export default function UserAddress(props) {
    
    // Might got potential problem if the user does fill up the address but a little bit of it only if we make it optional

    return (
        <>
            <label className="input-field-name" for="address">Address (Optional):</label>
            <div className="address">
            <input type="text" placeholder="Adress line 1" id="address" name="address" onChange={(e) => props.address(e.target.value)} ></input>
            <input type="text" placeholder="Address line 2" id="address" name="address" onChange={(e) => props.optional(e.target.value)}></input>
            <div className="postcode-city-field">
                <input type="number" placeholder="Postcode" id="address" name="address" onChange={(e) => props.postcode(e.target.value)} ></input>
                <input type="text" placeholder="City" id="address" name="address" onChange={(e) => props.city(e.target.value)}></input>
            </div>
            <input type="text" placeholder="State" id="address" name="address" onChange={(e) => props.state(e.target.value)}></input>
            </div>
        </>
    )
}