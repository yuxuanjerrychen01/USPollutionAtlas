import React from "react";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";
import "./styles.css";
import { useState } from "react";
import axios from "axios";
import TableVisual from "../Tables/TableVisual";

import allStates from "./allstates.json";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21]
};


function VisualMap( {onBack} ) {
    const [polluText, setPolluText] = useState("e.g. SO2");
    const [erorText, setErrorText] = useState("");
    const [submitText, setSubmitText] = useState("");
    const [stateName, setStateName] = useState([]);
    const [SO2, setSO2] = useState([]);
    const [CO, setCO] = useState([]);
    const [NO2, setNO2] = useState([]);
    const [O3, setO3] = useState([]);
    const [table, setTable] = useState("");

    const handlePolluTextChange = (event) => {
        setPolluText(event.target.value);
    };

    const handlePolluSubmit = async (event) => {
        event.preventDefault();
        if ((polluText !== "SO2") && (polluText !== "NO2") && (polluText !== "O3") && (polluText !== "CO")) {
            setErrorText("Bad pollutant name. Needs to be one of CO, NO2, SO2, O3.");
            setStateName([]);
            setNO2([]);
            setSO2([]);
            setO3([]);
            setCO([]);
        } else {
            // setSubmitText(stateText);
            // setExt(Math.random());
            // console.log("hi");
            const response = await axios.get("http://localhost:3001/statePollution");
            let data = response.data;
            console.log(data.length);
            let state_arr = [];
            let SO2_arr = [];
            let NO2_arr = [];
            let O3_arr = [];
            let CO_arr = [];
            for (let i = 0; i < data.length; i++) {
                // console.log(data[i]["StateName"]);
                state_arr.push(data[i]["StateName"]);
                SO2_arr.push(data[i]["SO2"]);
                NO2_arr.push(data[i]["NO2"]);
                O3_arr.push(data[i]["O3"]);
                CO_arr.push(data[i]["CO"]);
            }
            // console.log(state_arr);
            setStateName(state_arr);
            setNO2(NO2_arr);
            setSO2(SO2_arr);
            setO3(O3_arr);
            setCO(CO_arr);
            setErrorText("");

            const thing = <TableVisual dataEntry={data}/>
            setTable(thing);
        }
    };

    const handleBackClick = () => {
        onBack();
    };

    const selected = (geo) => {
        // console.log(geo);
        // const cur = allStates.find((s) => s.id === submitText);
        // if (cur !== undefined) {
        //     // console.log(cur.val);
        //     if (geo.id === cur.val) {return "#FFF";}
        // }
        // if (geo.properties.name === submitText) {return "#FFF";}
        if (stateName.includes(geo.properties.name)) {
            let idx = stateName.indexOf(geo.properties.name);
            if (polluText === "SO2") {
                if (SO2[idx] === -1) {return "#DDD";}                           // gray, no data
                else if (SO2[idx] > 0 && SO2[idx] <= 0.2) {return "#4CAF50";}   // green, good
                else if (SO2[idx] > 0.2 && SO2[idx] <= 0.5) {return "#FFB5A6";} // red 1
                else if (SO2[idx] > 0.5 && SO2[idx] <= 1) {return "#FF7E72";}   // red 2
                if (SO2[idx] > 1) {return "#A62C2B";}                           // red 3
                return "#4CAF50";
            } else if (polluText === "NO2") {
                if (NO2[idx] === -1) {return "#DDD";}                           // gray, no data
                else if (NO2[idx] > 0 && NO2[idx] <= 5) {return "#4CAF50";}     // green, good
                else if (NO2[idx] > 5 && NO2[idx] <= 10) {return "#FFB5A6";}    // red 1
                else if (NO2[idx] > 10 && NO2[idx] <= 15) {return "#FF7E72";}   // red 2
                if (NO2[idx] > 15) {return "#A62C2B";}                          // red 3
                return "#4CAF50";
            } else if (polluText === "CO") {
                if (CO[idx] === -1) {return "#DDD";}                            // gray, no data
                else if (CO[idx] > 0 && CO[idx] <= 0.1) {return "#4CAF50";}     // green, good
                else if (CO[idx] > 0.1 && CO[idx] <= 0.2) {return "#FFB5A6";}   // red 1
                else if (CO[idx] > 0.2 && CO[idx] <= 0.3) {return "#FF7E72";}   // red 2
                if (CO[idx] > 0.2) {return "#A62C2B";}                          // red 3
                return "#4CAF50";
            } else if (polluText === "O3") {
                if (O3[idx] === -1) {return "#DDD";}                            // gray, no data
                else if (O3[idx] > 0 && O3[idx] <= 0.015) {return "#4CAF50";}   // green, good
                else if (O3[idx] > 0.015 && O3[idx] <= 0.02) {return "#FFB5A6";}// red 1
                else if (O3[idx] > 0.02 && O3[idx] <= 0.03) {return "#FF7E72";} // red 2
                if (O3[idx] > 0.03) {return "#A62C2B";}                         // red 3
                return "#4CAF50";
            }
        }
        return "#DDD";
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
            <h2>Average pollution value for each state.</h2>
            
            <form onSubmit={handlePolluSubmit}>
                <label>
                    What table do you wish to look at? You can select from CO, SO2, NO2, O3.
                </label>
                <br></br>
                <br></br>
                <input className="input" onChange={handlePolluTextChange} value={polluText}/>
                <br></br>
                <br></br>
                <button className="button-blue">
                    view
                </button>
            </form>
            <br></br>
            <h3>{erorText}</h3>
            </div>

            <ComposableMap projection="geoAlbersUsa">
            <Geographies geography={geoUrl}>
                {({ geographies }) => (
                <>
                    {geographies.map((geo) => (
                    <Geography
                        key={geo.rsmKey}
                        stroke="#FFF"
                        geography={geo}
                        fill={selected(geo)}
                    />
                    ))}
                    {geographies.map((geo) => {
                    const centroid = geoCentroid(geo);
                    const cur = allStates.find((s) => s.val === geo.id);
                    return (
                        <g key={geo.rsmKey + "-name"}>
                        {cur &&
                            centroid[0] > -160 &&
                            centroid[0] < -67 &&
                            (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                            <Marker coordinates={centroid}>
                                <text y="2" fontSize={14} textAnchor="middle">
                                {cur.id}
                                </text>
                            </Marker>
                            ) : (
                            <Annotation
                                subject={centroid}
                                dx={offsets[cur.id][0]}
                                dy={offsets[cur.id][1]}
                            >
                                <text x={5} fontSize={14} alignmentBaseline="middle">
                                {cur.id}
                                </text>
                            </Annotation>
                            ))}
                        </g>
                    );
                    })}
                </>
                )}
            </Geographies>
            </ComposableMap>
            <br></br>
            {table}
        </div>
    );
};

export default VisualMap;
