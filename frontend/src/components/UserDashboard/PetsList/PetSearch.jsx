import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import searchIcon from "../../../assets/icons/search.svg";
import crossIcon from "../../../assets/icons/cross.svg";

export function PetSearch() {
    const timeBeforeSearch = 1000;
    const [searchParams, setSearchParams] = useSearchParams();
    const [type, setType] = useState("");
    const [loading, setLoading] = useState(false);
    const [val, setVal] = useState(searchParams.get('q'));
    const [shelters, setShelters] = useState([]);
    const [open, setOpen] = useState(false);
    const [timeoutid, setTimeoutid] = useState(0);

    function searchByName(name) {
        setLoading(true);
        axiosInstance.get(`/api/shelters/list/${name}/`)
        .then((res) => {
            console.log(res);
            setShelters(res.data.shelters);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleChange = (e) => {
        const newVal = e.target.value;
        clearTimeout(timeoutid);
        setVal(newVal);
        setLoading(true);
        if (newVal.length > 0) {
            setOpen(true);
        }
        if (newVal) {
            setTimeoutid(setTimeout(() => {
                searchByName(newVal);
            }, timeBeforeSearch));
        }
    }

    return (
        <div className="petsearch-container">
            <div className="petsearch-search">
                <img src={searchIcon} alt="search icon" />
                <input 
                    placeholder="Search" 
                    value={val} 
                    onChange={handleChange}
                    onFocus={() => {if (val.length > 0) setOpen(true);}}
                    onBlur={() => {if (val.length == 0) setOpen(false);}}
                />
            </div>
            <select 
                className="petsearch-type-selection"
                value={type}
                onChange={(e) => {setSearchParams((prev) => {
                    setType(e.target.value);
                    if (e.target.value) {
                        prev.set('type', e.target.value);
                    } else {
                        prev.delete('type');
                    }
                    return prev;
                });
            }}>
                <option value="">Select Type</option>
                <option value="DOG">Dog</option>
                <option value="CAT">Cat</option>
                <option value="PARROT">Parrot</option>
            </select>
            <img className="chatsearch-close-button" src={crossIcon} alt="close-icon" onClick={() => {
                setSearchParams(new URLSearchParams());
                setType("");
                setVal("");
                setOpen(false);
            }} />
            {open && <Results val={val} shelters={shelters} loading={loading} setOpen={setOpen} setSearchParams={setSearchParams} />}
        </div>
    );
}

function Results({ val, shelters, loading, setOpen, setSearchParams }) {
    return (
        <div className="petsearch-results-container">
            {loading 
            ? <div>...</div>
            : <>
                <p 
                    className="petsearch-results-search" 
                    onClick={() => {
                        setSearchParams((prev) => {
                            prev.set('q', val);
                            return prev;
                        });
                        setOpen(false);
                    }}
                >Search {val} by pet name</p>
                <p className="petsearch-results-label">Listed by shelter:</p>
                {shelters.length !== 0 && <ol>
                    {shelters.map((shelter) => {
                        const shelter_id = shelter.shelter_id;
                        return (<li key={shelter_id} onClick={() => {
                            setSearchParams((prev) => {
                                prev.set('sid', shelter_id);
                                return prev;
                            });
                            setOpen(false);
                        }}>{shelter.name}</li>);
                    })}
                </ol>}
            </>
            }
        </div>
    );
}