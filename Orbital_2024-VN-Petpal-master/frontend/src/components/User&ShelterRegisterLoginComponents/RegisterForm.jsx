import React, { useState } from 'react';

import RegisterForm1 from './RegisterForm1';
import RegisterForm2 from './RegisterForm2';
import RegisterForm3 from './RegisterForm3';


export default function RegisterForm(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [contactEmail, setContactEmail] = useState("");

    // const [country, setCountry] = useState("");
    // const [street1, setStreet1] = useState("");
    // const [street2, setStreet2] = useState("");
    // const [postcode, setPostcode] = useState("");
    // const [city, setCity] = useState("");
    // const [state, setState] = useState("");
    // const [phone, setPhone] = useState("");

    const [index, setIndex] = useState(1);
    function next() {
        setIndex((curr) => curr + 1);
    }

    switch(index) {
        case 1:
            return <RegisterForm1 next={next} setEmail={setEmail} setPassword={setPassword} />;
        case 2:
            return <RegisterForm2 next={next} setName={setName} setDesc={setDesc} setContactEmail={setContactEmail} />;
        case 3:
            return <RegisterForm3 next={next} email={email} password={password} name={name} desc={desc} contactEmail={contactEmail} />;
    }
}