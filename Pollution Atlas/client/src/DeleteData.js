import { useState } from "react";

function DeleteData( {onBack} ) {
    const [nameText, setNameText] = useState("");
    const [ageText, setAgeText] = useState("");

    const handleNameChange = (event) => {
        setNameText(event.target.value);
    };

    const handleAgeChange = (event) => {
        setAgeText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // connect to sql, insert new info
        console.log(event.target[0].value);
        console.log(event.target[1].value);
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
            
            <form onSubmit={handleSubmit}>
                <label> Name </label>
                <br></br>
                <input onChange={handleNameChange} value={nameText}/>
                <br></br>
                <label> Age </label>
                <br></br>
                <input onChange={handleAgeChange} value={ageText}/>
                <br></br>
                <button>
                    test
                </button>
            </form>
        </div>
    )
}

export default DeleteData;