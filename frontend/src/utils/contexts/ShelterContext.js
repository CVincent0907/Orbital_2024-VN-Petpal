import { createContext } from "react";

export const ShelterContext = createContext({
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
        country: "",
        is_valid: false
    },
    name: "",
    description: "",
    profile_pic: null,
    contact_email: "",
    country: "",
    phone_number: "",
    images: [],
    date_joined: ""
});