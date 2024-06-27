import { createContext } from "react";

export const PetContext = createContext({
    pet_id: 0,
    date_added: "",
    shelter_id: 0,
    name: "",
    avatar: null,
    description: "",
    type: "",
    breed: "",
    age: 0,
    images: [],
});