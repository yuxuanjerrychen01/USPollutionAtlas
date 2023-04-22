import { useState } from "react";
import DatabasePage from "./DatabasePage";

function App() {
    const [login, setLogin] = useState(0);

    const handleClick = () => {
       setLogin(1);
    }

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

    let landpage = <div>
        {introduction}
        <br></br>
        <div className="centering-h1">
        <button onClick={handleClick} className="button-blue">
            Login!
        </button>
        </div>
    </div>

    if (login !== 0) {landpage = <DatabasePage />}


    return (
        <div>
            <h1 className="centering-h1">US Pollution Atlas</h1>
            {landpage}
            <form>
                <br></br>
                <label>UserName  </label>
                <input className="input" />
                <br></br>
                <label>Password    </label>
                <input className="input" />
                <button className="button-blue">login</button>
                <br></br>
            </form>

        </div>
    );
}

export default App;