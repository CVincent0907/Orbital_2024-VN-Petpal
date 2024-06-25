import React from "react";
import img from "../../assets/DashboardIcon/image.svg";
import "./dashboard.css";


export default function ListedAnimal() {
    return (
      <div className="card">

        <div className="listed_animal">
            <img src={img} alt="Image"></img>
            <div className="text_section">
                <h2>&lt;name&gt;</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                laboris nisi ut aliquip ex ea commodo consequat.</p>         
            </div>       
        </div>

        <div className="card_bottom">
          <h3>Age: &lt;age&gt;</h3>
          <h3>Type: &lt;type&gt;</h3>
          <h3>Breed: &lt;breed&gt;</h3>
        </div>

      </div>
      )
}


