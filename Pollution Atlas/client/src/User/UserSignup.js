import { useState } from "react";
import axios from "axios";

function UserSignup( {onFail, onSignup, onBack} ) {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [output, setOutput] = useState(0);

    const handleSignup = async (event) => {
        event.preventDefault();
        if (password !== password2) {
            onFail();
        } else {
            const text = `{
                "QUERY": [
                    {
                        "INSERT": "userLogin", 
                        "VALUES" : {
                            "FirstName": ["\'${first}\'"],
                            "LastName": ["\'${last}\'"],
                            "EmailAddress": ["\'${email}\'"],
                            "UserRole": ["\'developer\'"],
                            "Username": ["\'${username}\'"],
                            "Password": ["\'${password}\'"]
                        }
                    }
                ]
            }`;
            console.log(text);
            const json_obj = JSON.parse(text);
            // console.log(json_obj);
            try {
                const response = await axios.put("http://localhost:3001/insert", json_obj);
                console.log(response);
                setOutput(1);
                onSignup();
            } catch {
                console.log("bad");
                onFail();
            }
        }
    };

    const handleFirstChange = (event) => {
        setFirst(event.target.value);
    };

    const handleLastChange = (event) => {
        setLast(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePassword2Change = (event) => {
        setPassword2(event.target.value);
    };

    const handleBackClick = () => {
        setOutput(0);
        onBack();
    };

    let the_form = <form onSubmit={handleSignup}>
                        <label>First Name: </label>
                        <br></br>
                        <input className="input" onChange={handleFirstChange} value={first}/>
                        <br></br>
                        <label>Last Name: </label>
                        <br></br>
                        <input className="input" onChange={handleLastChange} value={last}/>
                        <br></br>
                        <label>Email Address: </label>
                        <br></br>
                        <input className="input" onChange={handleEmailChange} value={email}/>
                        <br></br>
                        <label>Username: </label>
                        <br></br>
                        <input className="input" onChange={handleUsernameChange} value={username}/>
                        <br></br>
                        <label>Password: </label>
                        <br></br>
                        <input className="input" onChange={handlePasswordChange} value={password} type="password"/>
                        <br></br>
                        <label>Re-enter Password: </label>
                        <br></br>
                        <input className="input" onChange={handlePassword2Change} value={password2} type="password"/>
                        <button className="button-green">sign-up</button>
                    </form>;

    if (output === 1) {the_form = <h2 className="centering-h1">Successfully created account! Please go back and log in.</h2>}
    // else if (output === -1)

    return (
        <div>
            <div className="centering-p">
            <button className="button-blue" onClick={handleBackClick}>back</button>
            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <div className="centering-p">
            {the_form}
            </div>
        </div>
    );
}

export default UserSignup;