import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import searchIcon from "../../../assets/icons/search.svg";
import crossIcon from "../../../assets/icons/cross.svg";

export function ShelterSearch() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [val, setVal] = useState(searchParams.get('q'));

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchParams(new URLSearchParams(`q=${val}`));
    }

    return (
        <form 
            className="sheltersearch-container"
            onSubmit={handleSubmit}
        >
            <img src={searchIcon} alt="search icon" />
            <input 
                placeholder="Search" 
                value={val} 
                onChange={(e) => setVal(e.target.value)}
            />
            <img className="chatsearch-close-button" src={crossIcon} alt="close-icon" onClick={() => {
                setSearchParams(new URLSearchParams());
                setVal("");
            }} />
        </form>
    );
}