import { createContext } from "react";

export const UserContext = createContext({
    shelter_id: 0,
    account: {
        account_id: 0,
        last_login: null,
        email: "",
        role: "SHELTER"
    },
    address: {
        unit_number: "",
        street_name: "",
        address_line_1: "",
        address_line_2: "",
        region: "",
        postcode: "",
        city: "",
        state: "",
        country: ""
    },
    display_name: "",
    profile_pic: null,
    country: "",
    date_joined: ""
});