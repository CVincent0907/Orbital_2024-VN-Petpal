import React from "react";


export function CountrySelectionField({ initCountry="", setCountry, label=true }) {
    const options = [
        {label: "Singapore", value: "SG"},
        {label: "Malaysia", value: "MY"},
    ];

    return (
        <div className="country-container">
            {label && <label>Country:</label>}
            <select defaultValue={initCountry} onChange={(e) => setCountry(e.target.value)}>
                <option className="select--disabled" value="" disabled>Select</option>
                {options.map((option) => <option value={option.value}>{option.label}</option>)}
            </select>
        </div>
    );
}