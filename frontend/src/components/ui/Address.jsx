import React from "react";


export function Address({ initAddress, setAddress, label=true }) {
    /* Address structure: {
        address_line_1: "",
        address_line_2: "",
        postcode: "",
        city: "",
        state: "",
        country: "",
    }
    */
    
    initAddress = initAddress ? initAddress : {};
    function handleChange(e, name) {
        setAddress((address) => ({
            ...address,
            [name]: e.target.value,
        }));
    }

    return (
        <div className="address-container">
            {label && <label>Address:</label>}
            <input type="text" placeholder="Address line 1" defaultValue={initAddress.address_line_1} onChange={(e) => handleChange(e, "address_line_1")} />
            <input type="text" placeholder="Address line 2" defaultValue={initAddress.address_line_2} onChange={(e) => handleChange(e, "address_line_2")} />
            <div className="horizontal">
                <input type="text" placeholder="Postcode" defaultValue={initAddress.postcode} onChange={(e) => handleChange(e, "postcode")} />
                <input type="text" placeholder="City" defaultValue={initAddress.city} onChange={(e) => handleChange(e, "city")} />
            </div>
            <input type="text" placeholder="State" defaultValue={initAddress.state} onChange={(e) => handleChange(e, "state")} />
        </div>
    );
}