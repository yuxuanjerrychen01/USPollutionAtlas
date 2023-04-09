import { useState } from "react";
import axios from "axios";
import Table from "./Table";

function UpdateData( {onBack} ) {
    const [fromText, setFromText] = useState("e.g. SO2");
    const [whereText1, setWhereText1] = useState("e.g. FIPSCODE");
    const [whereText2, setWhereText2] = useState("e.g. 25025");
    const [updateText1, setUpdateText1] = useState("e.g. `SO2 MEAN`");
    const [updateText2, setUpdateText2] = useState("e.g. 7");
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

    const handleUpdateText1Change = (event) => {
        setUpdateText1(event.target.value);
    };

    const handleUpdateText2Change = (event) => {
        setUpdateText2(event.target.value);
    };

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        if ((fromText.length <= 0) || (updateText1.length <= 0) || (updateText2.length <= 0) || (whereText1.length <= 0) || (whereText2.length <= 0)) {
            setOutput("bad submit, entries should not be empty :(");
        } else {
            const text = `{
                "QUERY": 
                [{
                    "UPDATE": "${fromText}", 
                    "SET" : {"${updateText1}": ${updateText2}}, 
                    "WHERE" : {"${whereText1}": ${whereText2}}
                }]
            }`;
            console.log(text);
            const json_obj = JSON.parse(text);
            const response = await axios.put("http://localhost:3001/update", json_obj);
            console.log(response);
            // let successText = "UPDATE " + fromText + " SET " + updateText1 + " = " + updateText2 + 
            // " WHERE " + whereText1 + " = " + whereText2 + " -- successfully updated :)";
            // setOutput(successText);
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
            <h2>Basic updating.</h2>
            
            <form onSubmit={handleUpdateSubmit}>
                <label>
                    What tables do you wish to look at?
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
                <label>
                    What do you want to update?
                </label>
                <br></br>
                <input className="input" onChange={handleUpdateText1Change} value={updateText1}/>
                    = &nbsp;
                <input className="input" onChange={handleUpdateText2Change} value={updateText2}/>
                <br></br>
                <br></br>
                <button className="button-blue">
                    submit
                </button>
            </form>
            </div>

            <br></br>

            <div>
            <h2>Advanced updating.</h2>
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

export default UpdateData;