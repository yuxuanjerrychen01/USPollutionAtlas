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
    const [stateText, setStateText] = useState("e.g. OH");
    const [submitText, setSubmitText] = useState("");
    const [ext, setExt] = useState("1");

    const handleStateTextChange = (event) => {
        setStateText(event.target.value);
    };

    const handleStateSubmit = (event) => {
        event.preventDefault();
        setSubmitText(stateText);
        setExt(Math.random());
    };

    const handleBackClick = () => {
        onBack();
    };

    const selected = (geo) => {
        // console.log(geo);
        const cur = allStates.find((s) => s.id === submitText);
        if (cur !== undefined) {
            // console.log(cur.val);
            if (geo.id === cur.val) {return "#FFF";}
        }
    
        if (geo.properties.name === submitText) {return "#FFF";}
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
            <h2>Maximum AQI for every location.</h2>
            
            <form onSubmit={handleStateSubmit}>
                <label>
                    What tables do you wish to look at?
                </label>
                <br></br>
                <br></br>
                <input className="input" onChange={handleStateTextChange} value={stateText}/>
                <br></br>
                <br></br>
                <button className="button-blue">
                    submit
                </button>
            </form>
            {ext}
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
        </div>
    );
};

export default VisualMap;
