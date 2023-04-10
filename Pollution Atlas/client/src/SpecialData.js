import { useState } from "react";
import axios from "axios";
import TableAQI from "./TableAQI";

function SpecialData( {onBack} ) {
    const [fromText, setFromText] = useState("e.g. NO2");
    // const [whereText1, setWhereText1] = useState("e.g. YMD");
    // const [whereText2, setWhereText2] = useState("e.g. 20160226");
    // const [updateText1, setUpdateText1] = useState("e.g. `NO2 MEAN`");
    // const [updateText2, setUpdateText2] = useState("e.g. 11.0");
    const [tableAQI, setTableAQI] = useState("");

    const handleFromTextChange = (event) => {
        setFromText(event.target.value);
    };

    // const handleWhereText1Change = (event) => {
    //     setWhereText1(event.target.value);
    // };

    // const handleWhereText2Change = (event) => {
    //     setWhereText2(event.target.value);
    // };

    // const handleUpdateText1Change = (event) => {
    //     setUpdateText1(event.target.value);
    // };

    // const handleUpdateText2Change = (event) => {
    //     setUpdateText2(event.target.value);
    // };

    const handleAQISubmit = async (event) => {
        event.preventDefault();
        let text = "";
        if ((fromText.length <= 0)) {
            text = `{
                "QUERY": ["CO", "NO2", "SO2", "O3"]
            }`;
            const json_obj = JSON.parse(text);
            const response = await axios.put("http://localhost:3001/maxAqi", json_obj);
            console.log(response);
            const data_array = response.data;
            const thing = <TableAQI dataEntry={data_array}/>
            setTableAQI(thing);
        } else if ((text == "C0") || (text == "S02") || (text == "N02") || (text == "03")) {
            text = `{
                "QUERY": ["${fromText}"]
            }`;
            const json_obj = JSON.parse(text);
            const response = await axios.put("http://localhost:3001/maxAqi", json_obj);
            console.log(response);
            const data_array = response.data;
            const thing = <TableAQI dataEntry={data_array}/>
            setTableAQI(thing);
        } else {
            setTableAQI("bad table name :(");
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
                <input className="input" onChange={handleFromTextChange} value={fromText}/>
                <br></br>
                <br></br>
                <button className="button-blue">
                    submit
                </button>
            </form>
            </div>

            <br></br>

            <div>
            <h2>Other advanced queries.</h2>
            <form>
                <label>
                    Currently in progress.
                </label>
            </form>
            </div>

            <br></br>

            <h2>Results:</h2>
            {tableAQI}
        </div>
    )
}

export default SpecialData;