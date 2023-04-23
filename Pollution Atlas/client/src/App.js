import { useState } from "react";
import DatabasePage from "./DatabasePage";
import UserLogin from "./User/UserLogin";
import UserSignup from "./User/UserSignup";

function App() {
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false);
    const [success, setSuccess] = useState(0);
    const [fail, setFail] = useState("");

    const handleLoginClick = () => {
        setFail("");
        setLogin(!login);
    };

    const handleSignupClick = () => {
        setSignup(!signup);
    };

    const handleSuccessLogin = () => {
        setFail("");
        setSuccess(1);
    };

    const handleSuccessLogout = () => {
        setFail("");
        setSuccess(0);
    };

    const handleFailLogin_Signup = () => {
        setFail("Bad username/password. Please try again.");
    };

    const handleSuccessSignup = () => {
        setFail("");
    };

    const introduction = <div>
        <p className="centering-p">
        This dataset contains detailed, everyday data of four major pollutants 
        (Nitrogen Dioxide, Sulphur Dioxide, Carbon Monoxide and Ozone) of US Pollution from 2000 to 2016 documented by US EPA.
        <br></br> <br></br>
        There are 6 main tables in our database.
        </p>
        <p className="centering-p">
        <b>Dates: &nbsp; </b> Year, Month, Day
        </p>
        <p className="centering-p">
        <b>Location: &nbsp; </b> FIPSCODE, State Name, County Name
        </p>
        <p className="centering-p">
        <b>CO Pollutant: &nbsp; </b> CO Mean, CO Max Value, CO Max Hour, CO AQI
        </p>
        <p className="centering-p">
        <b>SO2 Pollutant: &nbsp; </b> SO2 Mean, SO2 Max Value, SO2 Max Hour, SO2 AQI
        </p>
        <p className="centering-p">
        <b>NO2 Pollutant: &nbsp; </b> NO2 Mean, NO2 Max Value, NO2 Max Hour, NO2 AQI
        </p>
        <p className="centering-p">
        <b>O3 Pollutant: &nbsp; </b> O3 Mean, O3 Max Value, O3 Max Hour, O3 AQI
        </p> 
    </div>

    let login_signup = <div>
        <div className="centering-h1">
        <button onClick={handleLoginClick} className="button-blue">
            Login!
        </button>
        <button onClick={handleSignupClick} className="button-blue">
            Sign-up!
        </button>
        </div>
    </div>

    let landpage = <div>
        {introduction}
        <br></br>
    </div>

    if (login !== false) {login_signup = <UserLogin onFail={handleFailLogin_Signup} onLogin={handleSuccessLogin} onBack={handleLoginClick} />}
    else if (signup !== false) {login_signup = <UserSignup onFail={handleFailLogin_Signup} onSignup={handleSuccessSignup} onBack={handleSignupClick} />};

    if (success !== 0) {
        landpage = <DatabasePage onLogout={handleSuccessLogout}/>;
        login_signup = "";
    };


    return (
        <div>
            <h1 className="centering-h1">US Pollution Atlas</h1>
            {landpage}
            {login_signup}

            <br></br>

            <h2 className="centering-h1">{fail}</h2>
        </div>
    );
}

export default App;