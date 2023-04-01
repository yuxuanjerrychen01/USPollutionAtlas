import { useState } from "react";

function SearchData( {onBack} ) {
    const [data, setData] = useState("");
    const [FIPSText, setFIPSText] = useState("e.g. 017019");
    const [dateText, setDateText] = useState("e.g. yyyymmdd");
    const [polluText, setPolluText] = useState("e.g. CO");

    const handleFIPSChange = (event) => {
        setFIPSText(event.target.value);
    };

    const handleFIPSSubmit = (event) => {
        event.preventDefault();
        // connect to sql, request for info
        setData("heu");
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

    return (
        <div>
            <button onClick={handleBackClick}>
                back
            </button>
            <br></br>
            <br></br>
            
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
            <h2>Results:</h2>
            {data}

        </div>
    )
}

export default SearchData;