import SearchData from "./SearchData";
import InsertData from "./InsertData";
import UpdateData from "./UpdateData";
import DeleteData from "./DeleteData";
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

    const searchBlock = (<div>
        <h2>Search Pollutant Data</h2>
        Want to search for existing data?
            <button onClick={handleSearchClick}>
                look for data!
            </button>
    </div>)

    const insertBlock = (<div>
        <h2>Insert Pollutant Data</h2>
        Want to insert new data?
            <button onClick={handleInsertClick}>
                add new data!
            </button>
    </div>)

    const updateBlock = (<div>
        <h2>Update Pollutant Data</h2>
        Want to update existing data?
            <button onClick={handleUpdateClick}>
                change old data!
            </button>
    </div>)

    const deleteBlock = (<div>
        <h2>Delete Pollutant Data</h2>
        Want to delete wrong data?
            <button onClick={handleDeleteClick}>
                remove error data!
            </button>
    </div>)


    let totalBlock = (<div>
        {searchBlock}
        {insertBlock}
        {updateBlock}
        {deleteBlock}
    </div>)

    if (search) {
        totalBlock = <SearchData onBack={handleSearchClick}/>;
    } else if (insert) {
        totalBlock = <InsertData onBack={handleInsertClick}/>;
    } else if (update) {
        totalBlock = <UpdateData onBack={handleUpdateClick}/>;
    } else if (del) {
        totalBlock = <DeleteData onBack={handleDeleteClick}/>;
    }


    return (
        <div>
            {totalBlock}
        </div>
    )
}

export default DatabasePage;