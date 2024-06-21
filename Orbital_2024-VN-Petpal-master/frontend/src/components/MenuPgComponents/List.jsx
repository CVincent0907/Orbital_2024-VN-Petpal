import React from "react";
import Vector from "../../assets/MenuPgIcon/Vector.svg";
import Paw from "../../assets/MenuPgIcon/paw_icon.svg";
import MgGlass from "../../assets/MenuPgIcon/search_icon.svg";
import ListItem from "./ListItem";


export default function List() {

    return (
        <div>
            <ListItem img={MgGlass} content={"Find pets for adoption nearby"}/>
            <ListItem img={Paw} content={"Obtain information on interested pets easily"}/>
            <ListItem img={Vector} content={"Connect with animal shelters"}/>
        </div>
    )

}