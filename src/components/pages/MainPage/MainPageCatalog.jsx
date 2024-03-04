import CategoryList from "./CategoryList"
import React, { useEffect, useState } from "react";
import Async from "react-async";
import CatalogCardList from "./CatalogCardList";

const MainPageCatalog = () => {

    const [categoryActive, setCategoryActive] = useState('11');
    const [count, setCount] = useState(6);
    const [items, setItems] = useState([]);
    const [update, setUpdate] = useState(0);
    const [newCards, setNewCards] = useState(0);

    const requestCatalogCategories = async () => {
        const response = await fetch('http://localhost:7070/api/categories');
        return await response.json();
    }

    const requestMainPageCatalog = () => {
        if (categoryActive === "11") {
            const response = fetch('http://localhost:7070/api/items')
                .then(response => response.json())
                .then(json => {
                    // console.log(json);
                    setItems(items.concat(json));
                    setNewCards(json.length);
                });
        } else {
            const response = fetch(`http://localhost:7070/api/items?categoryId=${categoryActive}`)
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    setItems(items.concat(json));
                    setNewCards(json.length);
                });
        }
    }
    
    useEffect(requestMainPageCatalog, [update]);

    const loadMoreRequest = async () => {
        if (categoryActive === "11") {
            const response = await fetch(`http://localhost:7070/api/items?offset=${count}`)
                .then(response => response.json())
                .then(json => {
                    setItems(items.concat(json));
                    setNewCards(json.length);
                });
                setCount(count + 6);
        } else {
            const response = await fetch(`http://localhost:7070/api/items?categoryId=${categoryActive}&offset=${count}`)
                .then(response => response.json())
                .then(json => {
                    setItems(items.concat(json));
                    setNewCards(json.length);
                });
                setCount(count + 6);
        }
    }

    // console.log(items);
    // console.log(newCards);

    if (!(newCards < 6)) {
        return (
            <section className="catalog container">
                <h2 className="text-center">Каталог</h2>
                <Async promiseFn={requestCatalogCategories}>
                    <Async.Fulfilled>{data => <CategoryList data={data} categoryActive={categoryActive} setCategoryActive={setCategoryActive} setItems={setItems} setCount={setCount} setUpdate={setUpdate} update={update} setNewCards={setNewCards} />}</Async.Fulfilled>
                </Async>
                <CatalogCardList data={items} />
                <div className="text-center">
                  <button className="btn btn-outline-primary" onClick={loadMoreRequest}>Загрузить ещё</button>
                </div>
            </section>
        )
    } else {
        return (
            <section className="catalog container">
                <h2 className="text-center">Каталог</h2>
                <Async promiseFn={requestCatalogCategories}>
                    <Async.Fulfilled>{data => <CategoryList data={data} categoryActive={categoryActive} setCategoryActive={setCategoryActive} setItems={setItems} setCount={setCount} setUpdate={setUpdate} update={update} setNewCards={setNewCards} />}</Async.Fulfilled>
                </Async>
                <CatalogCardList data={items} />
            </section>
        )
    }


    // return (
    //     <section className="catalog container">
    //         <h2 className="text-center">Каталог</h2>
    //         {/* <ul className="catalog-categories nav justify-content-center">
    //             {categoryNames.map((category, index) => <CategoryList key={index} props={category} categoryActive={categoryActive} activeClassCategory={activeClassCategory} />)}
    //         </ul> */}
    //         <Async promiseFn={requestCatalogCategories}>
    //             <Async.Fulfilled>{data => <CategoryList data={data} categoryActive={categoryActive} setCategoryActive={setCategoryActive} setItems={setItems} setCount={setCount} />}</Async.Fulfilled>
    //         </Async>
    //         <Async promiseFn={requestMainPageCatalog}>
    //             <Async.Pending><MainPageCatalogLoader /></Async.Pending>
    //             <Async.Fulfilled>{data => <CatalogCardList data={data} />}</Async.Fulfilled>
    //             <Async.Rejected>{error => <p>{error.message}</p>}</Async.Rejected>
    //         </Async>
    //         <CatalogCardList data={items} />
    //         {/* <LoadMoreButton /> */}
    //         <div className="text-center">
    //           <button className="btn btn-outline-primary" onClick={loadMoreRequest}>Загрузить ещё</button>
    //         </div>
    //     </section>
    // )
}

export default MainPageCatalog