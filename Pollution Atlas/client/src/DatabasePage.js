import SearchData from "./SearchData";
import InsertData from "./InsertData";
import UpdateData from "./UpdateData";
import DeleteData from "./DeleteData";
import SpecialData from "./SpecialData";
import { useState } from "react";

function DatabasePage() {
    const [search, setSearch] = useState(false);

    const handleSearchClick = () => {
        setSearch(!search);
    }

    const [insert, setInsert] = useState(false);

    const handleInsertClick = () => {
        setInsert(!insert);
    }

    const [update, setUpdate] = useState(false);

    const handleUpdateClick = () => {
        setUpdate(!update);
    }

    const [del, setDel] = useState(false);

    const handleDeleteClick = () => {
        setDel(!del);
    }

    const [special, setSpecial] = useState(false);

    const handleSpecialClick = () => {
        setSpecial(!special);
    }

    const searchBlock = (<div>
        <h2>Search Pollutant Data</h2>
        Want to search for existing data?
            <button className="button-blue" onClick={handleSearchClick}>
                look for data!
            </button>
    </div>)

    const insertBlock = (<div>
        <h2>Insert Pollutant Data</h2>
        Want to insert new data?
            <button className="button-blue" onClick={handleInsertClick}>
                add new data!
            </button>
    </div>)

    const updateBlock = (<div>
        <h2>Update Pollutant Data</h2>
        Want to update existing data?
            <button className="button-blue" onClick={handleUpdateClick}>
                change old data!
            </button>
    </div>)

    const deleteBlock = (<div>
        <h2>Delete Pollutant Data</h2>
        Want to delete wrong data?
            <button className="button-blue" onClick={handleDeleteClick}>
                remove error data!
            </button>
    </div>)

    const specialBlock = (<div>
        <h2>Other Procedures</h2>
        Want to do some advanced searching?
            <button className="button-blue" onClick={handleSpecialClick}>
                advanced search data!
            </button>
    </div>)


    let totalBlock = (<div>
        {searchBlock}
        {insertBlock}
        {updateBlock}
        {deleteBlock}
        {specialBlock}
    </div>)

    if (search) {
        totalBlock = <SearchData onBack={handleSearchClick}/>;
    } else if (insert) {
        totalBlock = <InsertData onBack={handleInsertClick}/>;
    } else if (update) {
        totalBlock = <UpdateData onBack={handleUpdateClick}/>;
    } else if (del) {
        totalBlock = <DeleteData onBack={handleDeleteClick}/>;
    } else if (special) {
        totalBlock = <SpecialData onBack={handleSpecialClick}/>;
    }


    return (
        <div>
            {totalBlock}
        </div>
    )
}

export default DatabasePage;