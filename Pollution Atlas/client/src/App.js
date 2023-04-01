import { useState } from "react";
import DatabasePage from "./DatabasePage";

function App() {
    const [login, setLogin] = useState(0);

    const handleClick = () => {
       setLogin(1);
    }

    const introduction = <p className="centering">
        This dataset contains detailed, everyday data of four major pollutants (Nitrogen Dioxide, Sulphur Dioxide, Carbon Monoxide and Ozone) of US Pollution from 2000 to 2016 documented by US EPA.
    </p>

    let landpage = <div>
        {introduction}
        <br></br>
        <div className="centering">
        <button onClick={handleClick}>
            Login!
        </button>
        </div>
    </div>

    if (login !== 0) {landpage = <DatabasePage />}


    return (
        <div>
            <h1 className="centering">US Pollution Atlas</h1>

            {landpage}
        </div>
    );
}

export default App;