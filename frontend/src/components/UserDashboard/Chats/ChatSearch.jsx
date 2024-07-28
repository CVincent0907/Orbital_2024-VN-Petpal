import React, { useContext, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../utils/contexts/UserContext";
import searchIcon from "../../../assets/icons/search.svg";
import crossIcon from "../../../assets/icons/cross.svg";

export function ChatSearch() {
    const timeBeforeSearch = 1000;
    const [loading, setLoading] = useState(false);
    const [val, setVal] = useState("");
    const [users, setUsers] = useState([]);
    const [shelters, setShelters] = useState([]);
    const [open, setOpen] = useState(false);
    const [timeoutid, setTimeoutid] = useState(0);

    function searchById(id) {
        setLoading(true);
        axiosInstance.get(`/api/auth/acc/${id}/`)
        .then((res) => {
            console.log(res);
            const role = res.data.role
            if (role == "USER") {
                setUsers([res.data.data]);
            } else if (role == "SHELTER") {
                setShelters([res.data.data]);
            }
            setLoading(false);
        })
        .catch((error) => {
            if (error.response.status == 404) {
                setLoading(false);
            } else {
                console.log(error);
            }
        });
    }

    function searchByName(name) {
        setLoading(true);
        const fetchUsers = axiosInstance.get(`/api/users/list/${name}/`)
        .then((res) => {
            console.log(res);
            setUsers(res.data.users);
        })
        .catch((error) => {
            console.log(error);
        });
        const fetchShelters = axiosInstance.get(`/api/shelters/list/${name}/`)
        .then((res) => {
            console.log(res);
            setShelters(res.data.shelters);
        })
        .catch((error) => {
            console.log(error);
        });
        Promise.all([fetchUsers, fetchShelters]).then(() => setLoading(false));
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
            if (newVal[0] == "@") {
                if (newVal.length > 1) {
                    setTimeoutid(setTimeout(() => {
                        searchById(newVal.slice(1));
                    }, timeBeforeSearch));
                }
            } else {
                setTimeoutid(setTimeout(() => {
                    searchByName(newVal);
                }, timeBeforeSearch));
            }
        }
    }

    return (
        <div className="chatsearch-container">
            <img src={searchIcon} alt="search icon" />
            <input 
                placeholder="Search by name, or @id" 
                value={val} 
                onChange={handleChange}
                onFocus={() => {if (val.length > 0) setOpen(true);}}
                onBlur={() => {if (val.length == 0) setOpen(false);}}
            />
            {open && <img className="chatsearch-close-button" src={crossIcon} alt="close-icon" onClick={() => setOpen(false)} />}
            {open && <Results users={users} shelters={shelters} loading={loading} />}
        </div>
    );
}

function Results({ users, shelters, loading }) {
    const id = useContext(UserContext).account.account_id;
    const [usersOpen, setUsersOpen] = useState(true);
    const [sheltersOpen, setSheltersOpen] = useState(true);
    const navigate = useNavigate();

    return (
        <div className="chatsearch-results-container">
            {loading 
            ? <div>...</div> 
            : <>
                <div 
                    className={`chatsearch-results-button ${sheltersOpen ? "open" : ""}`} 
                    onClick={() => setSheltersOpen((curr) => !curr)} 
                >
                    <p>Shelters</p>
                    <p className="arrow">&gt;</p>
                </div>
                {sheltersOpen && shelters.length !== 0 && <ol>
                    {shelters.map((shelter) => {
                        const account_id = shelter.account.account_id;
                        if (account_id != id) return (
                            <li key={account_id} onClick={() => navigate(account_id)}>{shelter.name}</li>
                        );
                    })}
                </ol>}
                <div 
                    className={`chatsearch-results-button ${usersOpen ? "open" : ""}`} 
                    onClick={() => setUsersOpen((curr) => !curr)} 
                >
                    <p>Users</p>
                    <p className="arrow">&gt;</p>
                </div>
                {usersOpen && <ol>
                    {users.map((user) => {
                        const account_id = user.account.account_id;
                        if (account_id != id) return (
                            <li key={account_id} onClick={() => navigate(account_id)}>{user.display_name}</li>
                        );
                    })}
                </ol>}
            </>
            }
        </div>
    );
}