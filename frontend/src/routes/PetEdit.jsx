import React from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";


export function PetEdit() {
    const { id } = useParams();
    return <h1>Edit Pet: {id}</h1>;
}