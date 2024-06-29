import PropTypes from 'prop-types';
import React from "react";

export default function Country(props) {
    return (
        <div className="country">
            <label for="country">Country:</label>
            <div>
            <select className="select-country" id="country" name="country" onChange={(e) => props.country(e.target.value)}required>
                <option value="" disabled selected>Select</option>
                <option value="SG">Singapore</option>
                {/*<option value="MY">Malaysia</option>*/}
            </select>
            </div>
        </div>   
    );
}