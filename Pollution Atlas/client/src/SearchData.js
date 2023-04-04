import { useState } from "react";
import axios from "axios";

function SearchData( {onBack} ) {
    const [data, setData] = useState("");
    const [FIPSText, setFIPSText] = useState("e.g. 017019");
    const [dateText, setDateText] = useState("e.g. yyyymmdd");
    const [polluText, setPolluText] = useState("e.g. CO");
    const [select1, setSelect1] = useState("");

    const handleFIPSChange = (event) => {
        setFIPSText(event.target.value);
    };

    const handleFIPSSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.put("http://localhost:3001/basicSearch", {
            // withCredentials: false,
            // params:
                
                    "SELECT": {
                        "`SO2 AQI`": 1,
                        "`CO AQI`": 1
                    },
                    "FROM": {
                        "SO2": 1,
                        "CO": 1
                    },
                    "WHERE": {
                        "StateName": "'Nevada'"
                    }
                
        });
        console.log(response);
        console.log(response.data[0]);
        const data1 = response.data[0][`CO AQI`]
        const data2 = response.data[0][`SO2 AQI`]
        let output = `CO AQI: ${data1}, SO2 AQI: ${data2}`;
        setData(output);
    };

    const handleDateChange = (event) => {
        setDateText(event.target.value);
    };

    const handleDateSubmit = (event) => {
        event.preventDefault();
        // connect to sql, request for info
        setData("heuuu");
    };

    const handlePolluChange = (event) => {
        setPolluText(event.target.value);
    };

    const handlePolluSubmit = (event) => {
        event.preventDefault();
        if (polluText === "CO") {
            // connect to sql, request for info
            setData("co");
        } else if (polluText === "NO2") {
            // connect to sql, request for info
            setData("no2");
        } else if (polluText === "SO2") {
            // connect to sql, request for info
            setData("so2");
        } else if (polluText === "O3") {
            // connect to sql, request for info
            setData("o3");
        } else {
            setData("Not a valid pollutant name.");
        }
    };

    const handleBackClick = () => {
        onBack();
    };

    const handleSelectChange = (event) => {
        setSelect1(event.target.value);
    }

    const handleSelectSubmit = (event) => {
        event.preventDefault();
        setData(select1);
    }

    return (
        <div>
            <button onClick={handleBackClick}>
                back
            </button>
            <br></br>
            <br></br>

            <h2>Basic searching.</h2>
            
            <form onSubmit={handleFIPSSubmit}>
                <label>
                    Search using FIPS. A valid example would be 017019 (which is Champaign Illinois).
                </label>
                <br></br>
                <input onChange={handleFIPSChange} value={FIPSText}/>
                <button>
                    submit
                </button>
                <br></br>
            </form>

            <br></br>

            <form onSubmit={handleDateSubmit}>
                <label>
                    Search using date following format yyyymmdd. A valid example would be 20010101.
                </label>
                <br></br>
                <input onChange={handleDateChange} value={dateText}/>
                <button>
                    submit
                </button>
                <br></br>
            </form>

            <br></br>

            <form onSubmit={handlePolluSubmit}>
                <label>
                    Search using pollutant. We store CO, NO2, SO2, O3.
                </label>
                <br></br>
                <input onChange={handlePolluChange} value={polluText}/>
                <button>
                    submit
                </button>
                <br></br>
            </form>

            <br></br>

            <h2>More detailed search.</h2>

            <form onSubmit={handleSelectSubmit}>
                <label>
                    What data do you wish to see?
                </label>
                <br></br>
              
                <select value={select1} onChange={handleSelectChange}>
                    <option value="Locations">Locations</option>
                    <option value="Date">Date</option>
                    <option value="CO">CO</option>
                    <option value="audi">Audi</option>
                </select>
                <br></br>
                <input onChange={handlePolluChange} value={polluText}/>
                <button>
                    submit
                </button>
                <br></br>
            </form>

            <br></br>

            <h2>Results:</h2>
            {data}

        </div>
    )
}

export default SearchData;