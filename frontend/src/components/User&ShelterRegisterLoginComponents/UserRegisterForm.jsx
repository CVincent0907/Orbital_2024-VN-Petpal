import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import InputField from "./InputField";

export default function UserRegisterForm(props) {
    const navigate = useNavigate();
    const [Email, setEmail] = useState(null);
    const [Password, setPassword] = useState(null);
    const [CPassword, setCPassword] = useState(null);

    const goToNextPage = (e) => {
        navigate('/userregisterPage1')
    }
    

    return (
        <div>
            <section className="RegisterFormSection">
                <form className="registerForm">
                    <InputField type="email" placeholder="Email" id="email" name="Email" autoFocus={true} change={(e) => setEmail(e.target.value)}/>
                    <InputField type="password" placeholder="Password" id="password" name="Password" autoFocus={false} change={(e) => setPassword(e.target.value)}/>
                    <label className="input-field-name" htmlFor="confirm-password">Confirm password:</label>
                    <input type="password" placeholder="Password" id="confirm-password" name="Confirm password"  onChange={(e) => setCPassword(e.target.value)}/>
                    <div>
                        <Button className="next-button" name="Next" onClick={goToNextPage} />
                    </div>
                </form>
            </section>
        </div>
    )
}
