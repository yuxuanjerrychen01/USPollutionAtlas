import { useState } from "react";
import axios from "axios";
import Table from "../Tables/Table";

function InsertData( {onBack} ) {
    const [dateText, setDateText] = useState("e.g. yymmdd");
    const [locationText, setLocationText] = useState("e.g. 25025");

    const [meanCOText, setMeanCOText] = useState(-1);
    const [meanSO2Text, setMeanSO2Text] = useState(-1);
    const [meanNO2Text, setMeanNO2Text] = useState(-1);
    const [meanO3Text, setMeanO3Text] = useState(-1);

    const [maxCOText, setMaxCOText] = useState(-1);
    const [maxSO2Text, setMaxSO2Text] = useState(-1);
    const [maxNO2Text, setMaxNO2Text] = useState(-1);
    const [maxO3Text, setMaxO3Text] = useState(-1);

    const [maxhCOText, setMaxhCOText] = useState(-1);
    const [maxhSO2Text, setMaxhSO2Text] = useState(-1);
    const [maxhNO2Text, setMaxhNO2Text] = useState(-1);
    const [maxhO3Text, setMaxhO3Text] = useState(-1);

    const [aqiCOText, setAqiCOText] = useState(-1);
    const [aqiSO2Text, setAqiSO2Text] = useState(-1);
    const [aqiNO2Text, setAqiNO2Text] = useState(-1);
    const [aqiO3Text, setAqiO3Text] = useState(-1);

    const [output, setOutput] = useState("");

    const handleDateTextChange = (event) => {
        setDateText(event.target.value);
    };

    const handleLocationTextChange = (event) => {
        setLocationText(event.target.value);
    };

    const handleMeanCOTextChange = (event) => {
        setMeanCOText(event.target.value);
    };

    const handleMaxCOTextChange = (event) => {
        setMaxCOText(event.target.value);
    };

    const handleMaxhCOTextChange = (event) => {
        setMaxhCOText(event.target.value);
    };

    const handleAqiCOTextChange = (event) => {
        setAqiCOText(event.target.value);
    };

    const handleMeanSO2TextChange = (event) => {
        setMeanSO2Text(event.target.value);
    };

    const handleMaxSO2TextChange = (event) => {
        setMaxSO2Text(event.target.value);
    };

    const handleMaxhSO2TextChange = (event) => {
        setMaxhSO2Text(event.target.value);
    };

    const handleAqiSO2TextChange = (event) => {
        setAqiSO2Text(event.target.value);
    };

    const handleMeanNO2TextChange = (event) => {
        setMeanNO2Text(event.target.value);
    };

    const handleMaxNO2TextChange = (event) => {
        setMaxNO2Text(event.target.value);
    };

    const handleMaxhNO2TextChange = (event) => {
        setMaxhNO2Text(event.target.value);
    };

    const handleAqiNO2TextChange = (event) => {
        setAqiNO2Text(event.target.value);
    };

    const handleMeanO3TextChange = (event) => {
        setMeanO3Text(event.target.value);
    };

    const handleMaxO3TextChange = (event) => {
        setMaxO3Text(event.target.value);
    };

    const handleMaxhO3TextChange = (event) => {
        setMaxhO3Text(event.target.value);
    };

    const handleAqiO3TextChange = (event) => {
        setAqiO3Text(event.target.value);
    };

    const handleInsertSubmit = async (event) => {
        event.preventDefault();
        const text = `{
            "QUERY": [
                {
                    "INSERT": "CO", 
                    "VALUES" : {
                        "FIPSCODE": [${locationText}],
                        "YMD": [${dateText}],
                        "\`CO MEAN\`": [${meanCOText}],
                        "\`CO MAXVAL\`": [${maxCOText}],
                        "\`CO MAXHOUR\`": [${maxhCOText}],
                        "\`CO AQI\`": [${aqiCOText}]
                    }
                },
                {
                    "INSERT": "SO2", 
                    "VALUES" : {
                        "FIPSCODE": [${locationText}],
                        "YMD": [${dateText}],
                        "\`SO2 MEAN\`": [${meanSO2Text}],
                        "\`SO2 MAXVAL\`": [${maxSO2Text}],
                        "\`SO2 MAXHOUR\`": [${maxhSO2Text}],
                        "\`SO2 AQI\`": [${aqiSO2Text}]
                    }
                },
                {
                    "INSERT": "NO2", 
                    "VALUES" : {
                        "FIPSCODE": [${locationText}],
                        "YMD": [${dateText}],
                        "\`NO2 MEAN\`": [${meanNO2Text}],
                        "\`NO2 MAXVAL\`": [${maxNO2Text}],
                        "\`NO2 MAXHOUR\`": [${maxhNO2Text}],
                        "\`NO2 AQI\`": [${aqiNO2Text}]
                    }
                },
                {
                    "INSERT": "O3", 
                    "VALUES" : {
                        "FIPSCODE": [${locationText}],
                        "YMD": [${dateText}],
                        "\`O3 MEAN\`": [${meanO3Text}],
                        "\`O3 MAXVAL\`": [${maxO3Text}],
                        "\`O3 MAXHOUR\`": [${maxhO3Text}],
                        "\`O3 AQI\`": [${aqiO3Text}]
                    }
                }
            ]
        }`;
        console.log(text);
        const json_obj = JSON.parse(text);
        const response = await axios.put("http://localhost:3001/insert", json_obj);
        console.log(response);
        setOutput("success :)");
        
    }


    const handleBackClick = () => {
        onBack();
    };

    return (
        <div>
            <div>
            <button className="button-blue" onClick={handleBackClick}>
                back
            </button>
            <br></br>
            <br></br>
            </div>

            <div>
            <form onSubmit={handleInsertSubmit}>
                <h2>Location of pollutant data</h2>
                <label> Enter FIPSCODE here: </label>
                <br></br>
                <br></br>
                <input className="input" onChange={handleLocationTextChange} value={locationText}/>

                <h2>Date of pollutant data</h2>
                <label> Enter date (YMD) here: </label>
                <br></br>
                <br></br>
                <input className="input" onChange={handleDateTextChange} value={dateText}/>

                <h2>CO Pollutant data</h2>
                <h3>Default value is -1, leave as -1 for null values.</h3>
                <label> Enter AQI here: </label>
                <input className="input" onChange={handleAqiCOTextChange} value={aqiCOText}/>
                <label> Enter Max Val here: </label>
                <input className="input" onChange={handleMaxCOTextChange} value={maxCOText}/>
                <br></br>
                <br></br>
                <label> Enter Max Hour here: </label>
                <input className="input" onChange={handleMaxhCOTextChange} value={maxhCOText}/>
                <label> Enter Mean here: </label>
                <input className="input" onChange={handleMeanCOTextChange} value={meanCOText}/>

                <h2>SO2 Pollutant data</h2>
                <h3>Default value is -1, leave as -1 for null values.</h3>
                <label> Enter AQI here: </label>
                <input className="input" onChange={handleAqiSO2TextChange} value={aqiSO2Text}/>
                <label> Enter Max Val here: </label>
                <input className="input" onChange={handleMaxSO2TextChange} value={maxSO2Text}/>
                <br></br>
                <br></br>
                <label> Enter Max Hour here: </label>
                <input className="input" onChange={handleMaxhSO2TextChange} value={maxhSO2Text}/>
                <label> Enter Mean here: </label>
                <input className="input" onChange={handleMeanSO2TextChange} value={meanSO2Text}/>

                <h2>NO2 Pollutant data</h2>
                <h3>Default value is -1, leave as -1 for null values.</h3>
                <label> Enter AQI here: </label>
                <input className="input" onChange={handleAqiNO2TextChange} value={aqiNO2Text}/>
                <label> Enter Max Val here: </label>
                <input className="input" onChange={handleMaxNO2TextChange} value={maxNO2Text}/>
                <br></br>
                <br></br>
                <label> Enter Max Hour here: </label>
                <input className="input" onChange={handleMaxhNO2TextChange} value={maxhNO2Text}/>
                <label> Enter Mean here: </label>
                <input className="input" onChange={handleMeanNO2TextChange} value={meanNO2Text}/>

                <h2>O3 Pollutant data</h2>
                <h3>Default value is -1, leave as -1 for null values.</h3>
                <label> Enter AQI here: </label>
                <input className="input" onChange={handleAqiO3TextChange} value={aqiO3Text}/>
                <label> Enter Max Val here: </label>
                <input className="input" onChange={handleMaxO3TextChange} value={maxO3Text}/>
                <br></br>
                <br></br>
                <label> Enter Max Hour here: </label>
                <input className="input" onChange={handleMaxhO3TextChange} value={maxhO3Text}/>
                <label> Enter Mean here: </label>
                <input className="input" onChange={handleMeanO3TextChange} value={meanO3Text}/>

                <br></br>
                <br></br>
                <button className="button-blue">
                    submit
                </button>
            </form>
            </div>

            <br></br>

            <div>
            <h2>Advanced inserting.</h2>
            <form>
                <label>
                    Currently in progress.
                </label>
            </form>
            </div>

            <br></br>

            <h2>Results:</h2>
            {output}
        </div>
    )
}

export default InsertData;