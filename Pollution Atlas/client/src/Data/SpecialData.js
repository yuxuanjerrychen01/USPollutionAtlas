import { useState } from "react";
import axios from "axios";
import TableAQI from "../Tables/TableAQI";
import TableAVG from "../Tables/TableAVG";

function SpecialData( {onBack} ) {
    const [from1Text, setFrom1Text] = useState("e.g. SO2");
    const [from2Text, setFrom2Text] = useState("e.g. NO2");
    const [AQIText, setAQIText] = useState("e.g. SO2");
    const [valText, setValText] = useState(-1);
    const [table, setTable] = useState("");

    const handleFrom1TextChange = (event) => {
        setFrom1Text(event.target.value);
    };

    const handleFrom2TextChange = (event) => {
        setFrom2Text(event.target.value);
    };

    const handleAQITextChange = (event) => {
        setAQIText(event.target.value);
    };

    const handleValTextChange = (event) => {
        setValText(event.target.value);
    };

    const handleAQISubmit = async (event) => {
        event.preventDefault();
        let text = "";
        if ((from1Text.length <= 0)) {
            text = `{
                "QUERY": ["CO", "NO2", "SO2", "O3"]
            }`;
            const json_obj = JSON.parse(text);
            const response = await axios.put("http://localhost:3001/maxAqi", json_obj);
            console.log(response);
            const data_array = response.data;
            const thing = <TableAQI dataEntry={data_array}/>
            setTable(thing);
        } else if ((from1Text === "CO") || (from1Text === "SO2") || (from1Text === "NO2") || (from1Text === "O3")) {
            text = `{
                "QUERY": ["${from1Text}"]
            }`;
            const json_obj = JSON.parse(text);
            const response = await axios.put("http://localhost:3001/maxAqi", json_obj);
            console.log(response);
            const data_array = response.data;
            const thing = <TableAQI dataEntry={data_array}/>
            setTable(thing);
        } else {
            setTable("bad table name :(");
        }
    };

    const handleAverageSubmit = async (event) => {
        event.preventDefault();
        let text = "";
        if ((from2Text.length <= 0)) {
            setTable("needs a table name :(");
        } else if ((from2Text === "CO") || (from2Text === "SO2") || (from2Text === "NO2") || (from2Text === "O3")) {
            text = `{
                "QUERY": ["${from2Text}"]
            }`;
            const json_obj = JSON.parse(text);
            const response = await axios.put("http://localhost:3001/aboveAveragePollutant", json_obj);
            console.log(response);
            const data_array = response.data;
            const thing = <TableAVG dataEntry={data_array}/>
            setTable(thing);
        } else {
            setTable("bad table name :(");
        }
    };

    const handleAverageAQISubmit = async (event) => {
        event.preventDefault();
        let text1 = "";
        // {
        //     *     "pollutant": "SO2"
        //     *     "threshold": 2.0,
        //     * }
        //     * 
        if ((AQIText.length <= 0)) {
            setTable("needs a table name :(");
        } else if ((AQIText === "CO") || (AQIText === "SO2") || (AQIText === "NO2") || (AQIText === "O3")) {
            text1 = `{
                "pollutant": "${AQIText}",
                "threshold": ${valText}
            }`;
            console.log(text1);
            const json_obj1 = JSON.parse(text1);
            console.log(json_obj1);
            const response1 = await axios.put("http://localhost:3001/makeAQITable", json_obj1);
            console.log(response1);
            const response2 = await axios.get(`http://localhost:3001/showAQITable?query=${AQIText}`);
            console.log(response2);
            // const data_array = response.data;
            // const thing = <TableAVG dataEntry={data_array}/>
            // setTable(thing);
        } else {
            setTable("bad table name :(");
        }
    };

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
            <h2>Maximum AQI for every location.</h2>
            
            <form onSubmit={handleAQISubmit}>
                <label>
                    What tables do you wish to look at?
                </label>
                <br></br>
                <br></br>
                <input className="input" onChange={handleFrom1TextChange} value={from1Text}/>
                <br></br>
                <br></br>
                <button className="button-blue">
                    submit
                </button>
            </form>
            </div>

            <br></br>

            <div>
            <h2>Locations with average pollutant values greater than total average.</h2>
            
            <form onSubmit={handleAverageSubmit}>
                <label>
                    What tables do you wish to look at?
                </label>
                <br></br>
                <br></br>
                <input className="input" onChange={handleFrom2TextChange} value={from2Text}/>
                <br></br>
                <br></br>
                <button className="button-blue">
                    submit
                </button>
            </form>
            </div>

            <br></br>

            <div>
            <h2>States with Average AQI that surpass specific threshold for each pollutant.</h2>
            
            <form onSubmit={handleAverageAQISubmit}>
                <label>
                    What table do you wish to look at?
                </label>
                <br></br>
                <br></br>
                <input className="input" onChange={handleAQITextChange} value={AQIText}/>
                <br></br>
                <br></br>
                <label>
                    What is your average AQI threshold?
                </label>
                <br></br>
                <br></br>
                <input className="input" onChange={handleValTextChange} value={valText}/>
                <br></br>
                <br></br>
                <button className="button-blue">
                    submit
                </button>
            </form>
            </div>

            <br></br>

            {/* <div>
            <h2>Other advanced queries.</h2>
            <form>
                <label>
                    Currently in progress.
                </label>
            </form>
            </div> */}

            <br></br>

            <h2>Results:</h2>
            {table}
        </div>
    )
}

export default SpecialData;