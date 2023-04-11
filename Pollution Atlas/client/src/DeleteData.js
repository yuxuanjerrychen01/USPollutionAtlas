import { useState } from "react";
import axios from "axios";
import Table from "./Table";

function DeleteData( {onBack} ) {
    const [fromText, setFromText] = useState("e.g. SO2");
    const [whereText1, setWhereText1] = useState("e.g. FIPSCODE");
    const [whereText2, setWhereText2] = useState("e.g. 25025");
    const [output, setOutput] = useState("");

    const handleFromTextChange = (event) => {
        setFromText(event.target.value);
    };

    const handleWhereText1Change = (event) => {
        setWhereText1(event.target.value);
    };

    const handleWhereText2Change = (event) => {
        setWhereText2(event.target.value);
    };

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        if ((whereText1.length <= 0) || (whereText2.length <= 0)) {
            setOutput("bad submit, entries should not be empty :(");
        } else if (fromText.length > 0) {
            const text = `{
                "QUERY": 
                [{
                    "DELETE": "${fromText}", 
                    "WHERE" : {"${whereText1}": ${whereText2}}
                }]
            }`;
            console.log(text);
            const json_obj = JSON.parse(text);
            const response = await axios.put("http://localhost:3001/delete", json_obj);
            console.log(response);
            let successText = "DELETE " + fromText +  " WHERE " + whereText1 + " = " + whereText2 + " -- successfully deleted :)";
            setOutput(successText);
        } else if (fromText.length <= 0) {
            const text = `{
                "QUERY": [
                    {
                        "DELETE": "CO", 
                        "WHERE" : {"${whereText1}": ${whereText2}}
                    },
                    {
                        "DELETE": "SO2", 
                        "WHERE" : {"${whereText1}": ${whereText2}}
                    },
                    {
                        "DELETE": "NO2", 
                        "WHERE" : {"${whereText1}": ${whereText2}}
                    },
                    {
                        "DELETE": "O3", 
                        "WHERE" : {"${whereText1}": ${whereText2}}
                    }
                ]
            }`;
            console.log(text);
            const json_obj = JSON.parse(text);
            const response = await axios.put("http://localhost:3001/delete", json_obj);
            console.log(response);
            let successText = "DELETE CO, SO2, NO2, O3 WHERE " + whereText1 + " = " + whereText2 + " -- successfully deleted :)";
            setOutput(successText);
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
            <h2>Basic deleting.</h2>
            
            <form onSubmit={handleUpdateSubmit}>
                <label>
                    What tables do you wish to delete data from?
                </label>
                <br></br>
                <input className="input" onChange={handleFromTextChange} value={fromText}/>
                <br></br>
                <label>
                    Any conditions?
                </label>
                <br></br>
                <input className="input" onChange={handleWhereText1Change} value={whereText1}/>
                    = &nbsp;
                <input className="input" onChange={handleWhereText2Change} value={whereText2}/>
                <br></br>
                <br></br>
                <button className="button-blue">
                    submit
                </button>
            </form>
            </div>

            <br></br>

            <div>
            <h2>Advanced deleting.</h2>
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

export default DeleteData;