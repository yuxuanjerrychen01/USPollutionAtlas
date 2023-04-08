import { useState } from "react";
import axios from "axios";
import Table from "./Table";

function SearchData( {onBack} ) {
    // const [data, setData] = useState("");
    const [FIPSText, setFIPSText] = useState("e.g. 017019");
    const [dateText, setDateText] = useState("e.g. yyyymmdd");
    const [polluText, setPolluText] = useState("e.g. CO");

    const [selectText, setSelectText] = useState("e.g. `SO2 MEAN`");
    const [fromText, setFromText] = useState("e.g. SO2");
    const [whereText1, setWhereText1] = useState("e.g. FIPSCODE");
    const [whereText2, setWhereText2] = useState("e.g. 25025");

    const [table, setTable] = useState("");

    const handleSelectTextChange = (event) => {
        setSelectText(event.target.value);
    };

    const handleFromTextChange = (event) => {
        setFromText(event.target.value);
    };

    const handleWhereText1Change = (event) => {
        setWhereText1(event.target.value);
    };

    const handleWhereText2Change = (event) => {
        setWhereText2(event.target.value);
    };

    const handleGeneralSubmit = async (event) => {
        event.preventDefault();
        const text = `{
            "SELECT": {
                "${selectText}": 1
            },
            "FROM": {
                "${fromText}": 1
            },
            "WHERE": {
                "${whereText1}": ${whereText2}
            }
        }`;
        const json_obj = JSON.parse(text);
        const response = await axios.put("http://localhost:3001/basicSearch", json_obj);
        const data_array = response.data;
        const thing = <Table dataEntry={data_array}/>
        setTable(thing);
    };

    const handleFIPSChange = (event) => {
        setFIPSText(event.target.value);
    };

    const handleFIPSSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.put("http://localhost:3001/basicSearch", {
            "SELECT": {},
            "FROM": {},
            "WHERE": {
                "FIPSCODE": `${FIPSText}`
            }
        });
        const data_array = response.data;
        const thing = <Table dataEntry={data_array}/>
        setTable(thing);
    };

    const handleDateChange = (event) => {
        setDateText(event.target.value);
    };

    const handleDateSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.put("http://localhost:3001/basicSearchNew", {
            "SELECT": [],
            "FROM": [],
            "WHERE": {
                "YMD": `${dateText}`
            }
        });
        const data_array = response.data;
        console.log(response);
        // const thing = <Table dataEntry={data_array}/>
        // setTable(thing);
    };

    const handlePolluChange = (event) => {
        setPolluText(event.target.value);
    };

    const handlePolluSubmit = async (event) => {
        event.preventDefault();
        if (polluText === "CO") {
            const response = await axios.put("http://localhost:3001/basicSearch", {
                "SELECT": {},
                "FROM": {"CO" : 1},
                "WHERE": {}
            });
            const data_array = response.data;
            const thing = <Table dataEntry={data_array}/>
            setTable(thing);
        } else if (polluText === "NO2") {
            const response = await axios.put("http://localhost:3001/basicSearch", {
                "SELECT": {},
                "FROM": {"NO2" : 1},
                "WHERE": {}
            });
            const data_array = response.data;
            const thing = <Table dataEntry={data_array}/>
            setTable(thing);
        } else if (polluText === "SO2") {
            const response = await axios.put("http://localhost:3001/basicSearch", {
                "SELECT": {},
                "FROM": {"SO2" : 1},
                "WHERE": {}
            });
            const data_array = response.data;
            const thing = <Table dataEntry={data_array}/>
            setTable(thing);
        } else if (polluText === "O3") {
            const response = await axios.put("http://localhost:3001/basicSearch", {
                "SELECT": {},
                "FROM": {"O3" : 1},
                "WHERE": {}
            });
            const data_array = response.data;
            const thing = <Table dataEntry={data_array}/>
            setTable(thing);
        } else {
            setTable("Not a valid pollutant name.");
        }
    };

    const handleBasicSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.put("http://localhost:3001/basicSearch", {
            "SELECT": {},
            "FROM": {},
            "WHERE": {}
        });
        const data_array = response.data;
        const thing = <Table dataEntry={data_array}/>
        setTable(thing);
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
            <h2>Basic searching.</h2>
            
            <form onSubmit={handleFIPSSubmit}>
                <label>
                    Search using FIPS. A valid example would be 25025 (which is Suffolk, Massachusetts).
                </label>
                <br></br>
                <input className="input" onChange={handleFIPSChange} value={FIPSText}/>
                <button className="button-blue">
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
                <input className="input" onChange={handleDateChange} value={dateText}/>
                <button className="button-blue">
                    submit
                </button>
                <br></br>
            </form>

            <br></br>

            <form onSubmit={handlePolluSubmit}>
                <label>
                    Search using pollutant. We store CO, NO2, SO2, O3. Note that this might take at least 20 seconds to render.
                </label>
                <br></br>
                <input className="input" onChange={handlePolluChange} value={polluText}/>
                <button className="button-blue">
                    submit
                </button>
                <br></br>
            </form>

            <br></br>

            <form onSubmit={handleBasicSubmit}>
                <label>
                    Want to just see everything? Note that this might take at least 30 seconds to render.
                </label>
                <br></br>
                <br></br>
                <button className="button-blue">
                    search everything
                </button>
                <br></br>
            </form>

            <br></br>
            </div>


            <div>
            <h2>General searching.</h2>
            
            <form onSubmit={handleGeneralSubmit}>
                <label>
                    What tables do you wish to look at?
                </label>
                <br></br>
                <input className="input" onChange={handleFromTextChange} value={fromText}/>
                <br></br>
                <label>
                    What columns are you interested in?
                </label>
                <br></br>
                <input className="input" onChange={handleSelectTextChange} value={selectText}/>
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

            <br></br>
            </div>


            <div>
            <h2>Advanced searching.</h2>

            <form>
                <label>
                    Currently in progress.
                </label>
            </form>
            </div>
                {/* <br></br>
              
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
            </form> */}

            <br></br>

            <h2>Results:</h2>
            {/* <p dangerouslySetInnerHTML={{__html: data}} /> */}
            {table}


        </div>
    )
}

export default SearchData;