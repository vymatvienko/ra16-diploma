import CategoryList from "./CategoryList"
import React, { useEffect, useState } from "react";
import Async from "react-async";
import CatalogCardList from "./CatalogCardList";
import Loader from "../../Loader";

const MainPageCatalog = () => {
    const [items, setItems] = useState([]);
    const [newCards, setNewCards] = useState(0);
    const [searchOptions, setSearchOptions] = useState({});

    const { categoryId } = searchOptions;
    const setCategoryId = (categoryId) => setSearchOptions(prevState => ({
        ...prevState,
        categoryId,
    }))

    const requestCatalogCategories = async () => {
        const response = await fetch('http://localhost:7070/api/categories');
        return await response.json();
    }
    
    const getUrl = () => {
        const BASE_URL = 'http://localhost:7070'
        const path = '/api/items';
        const searchParams = new URLSearchParams;
        const { offset, searchQuery } = searchOptions;
        
        if (categoryId) {
            searchParams.append('categoryId', categoryId);
        }

        if (offset > 0) {
            searchParams.append('offset', offset);
        }
        if (searchQuery) {
            searchParams.append('q', searchQuery);
        }

        return BASE_URL + path + '?' + searchParams;
    }

    const requestMainPageCatalog = async () => {
        const url = getUrl();
        const response = await fetch(url);
        const json = await response.json();
        const { append = false } = searchOptions;
        setItems(data => append ? data.concat(json) : json);
        setNewCards(json.length);
    }

    useEffect(() => {
        requestMainPageCatalog()
    }, [searchOptions]);

    const loadMoreRequest = async () => {
        setSearchOptions(({ offset = 0, ...prevState }) => ({
            ...prevState,
            append: true,
            offset: offset + 6
        }));
    }

    const showLoadMore = newCards === 6;
    return (
        <section className="catalog container">
            <h2 className="text-center">Каталог</h2>
            <Async promiseFn={requestCatalogCategories}>
                <Async.Pending>
                    <Loader />
                </Async.Pending>
                <Async.Fulfilled>
                    {data => (
                        <CategoryList
                            data={data}
                            categoryActive={categoryId}
                            setCategoryActive={setCategoryId}
                            setSearchOptions={setSearchOptions}
                        />
                    )}
                </Async.Fulfilled>
            </Async>
            <CatalogCardList data={items}/>

            {showLoadMore && (
                <div className="text-center">
                    <button className="btn btn-outline-primary" onClick={loadMoreRequest}>Загрузить ещё</button>
                </div>
            )}
        </section>
    )
}

export default MainPageCatalog