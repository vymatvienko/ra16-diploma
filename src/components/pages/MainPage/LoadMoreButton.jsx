import Async from "react-async";
import CatalogCardList from "./CatalogCardList";
import { useState } from "react";

const LoadMoreButton = () => {
    let [test, setTest] = useState([]);
    const loadMoreRequest = async () => {
        const response = await fetch('http://localhost:7070/api/items?offset=6')
            // console.log(response.json());
            .then(response => response.json())
            .then(json => {
                // console.log(json);
                setTest(prevState => (prevState, json));
            });
            return
    }

    // console.log(test);

    return (
        <>
            <CatalogCardList data={test}/>
            <div className="text-center">
                <button className="btn btn-outline-primary" onClick={loadMoreRequest}>Загрузить ещё</button>
            </div>
        </>
    )
}

export default LoadMoreButton