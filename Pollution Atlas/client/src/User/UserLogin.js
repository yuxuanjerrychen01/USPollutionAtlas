import { useState } from "react";
import axios from "axios";

function UserLogin( {onFail, onLogin, onBack} ) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        
        const text = `{
            "Username": "${username}", 
            "Password" : "${password}"
        }`;
        const json_obj = JSON.parse(text);
        try {
            const response = await axios.put("http://localhost:3001/login", json_obj);
            console.log(response);
            onLogin();
        } catch {
            console.log("bad");
            onFail();
        }
        
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleBackClick = () => {
        onBack();
    };

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
            <form onSubmit={handleLogin}>
                <label>Username: </label>
                <br></br>
                <input className="input" onChange={handleUsernameChange} value={username} />
                <br></br>
                <label>Password: </label>
                <br></br>
                <input className="input" onChange={handlePasswordChange} value={password} type="password" />
                <button className="button-green">login</button>
            </form>
            </div>
        </div>
    );
}

export default UserLogin;