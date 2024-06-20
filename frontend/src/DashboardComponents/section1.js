import React from "react";
import Button from "../Components/Button";
import Particular_section1 from "./Particular_section1";
import Particular_section2 from "./Particular_section2";
import "./dashboard.css";


export default function Section1() {
   

    return (
        <div>
           <Particular_section1/>
           <hr className="particular_divider"/>
           <Particular_section2/>
           <div className="button-section1">
                {/* Yet to add onClick to the button */}
                <Button className={"done-button"} name={"Done"}></Button>
           </div>
        </div>
    )
}