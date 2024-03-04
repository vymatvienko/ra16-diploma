import CategoryList from "../MainPage/CategoryList";
import React, { useState, useEffect } from "react";
import Async from "react-async";
import CatalogCardList from "../MainPage/CatalogCardList";
import Search from "./Search";

const Catalog = () => {

    const [categoryActive, setCategoryActive] = useState('11');
    const [count, setCount] = useState(6);
    const [items, setItems] = useState([]);
    const [update, setUpdate] = useState(0);
    const [newCards, setNewCards] = useState(0);
    const [input, setInput] = useState();

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
                    // console.log(json);
                    setItems(items.concat(json));
                    setNewCards(json.length);
                });
        }
    }
    // console.log(update);
    useEffect(requestMainPageCatalog, [update]);

    // console.log(categoryActive);

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

    const searchRequest = async (e) => {
        e.preventDefault();
            // const response = await fetch('http://localhost:7070/api/items?q=принц')
            const response = await fetch(`http://localhost:7070/api/items?q=${input}`)
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    setItems(json);
                });
    }

    // console.log(items);
    // console.log(newCards);

    if (!(newCards < 6)) {
        return (
            <section className="catalog container">
                <h2 className="text-center">Каталог</h2>
                <Search searchRequest={searchRequest} />
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
                <Search searchRequest={searchRequest} input={input} setInput={setInput} />
                <Async promiseFn={requestCatalogCategories}>
                    <Async.Fulfilled>{data => <CategoryList data={data} categoryActive={categoryActive} setCategoryActive={setCategoryActive} setItems={setItems} setCount={setCount} setUpdate={setUpdate} update={update} setNewCards={setNewCards} />}</Async.Fulfilled>
                </Async>
                <CatalogCardList data={items} />
            </section>
        )
    }
}

export default Catalog















// const Catalog = () => {

//     const [categoryActive, setCategoryActive] = useState('11');
//     const [count, setCount] = useState(6);
//     const [items, setItems] = useState([]);

//     const requestCatalogCategories = async () => {
//         const response = await fetch('http://localhost:7070/api/categories');
//         return await response.json();
//     }

//     // const requestMainPageCatalog = () => {
//     if (count === 6) {
//         useEffect(() => {
//             if (categoryActive === "11") {
//                 const response = fetch('http://localhost:7070/api/items')
//                 .then(response => response.json())
//                 .then(json => {
//                     console.log(json);
//                     setItems(items.concat(json));
//                 });
//                 return
//             } else {
//                 const response = fetch(`http://localhost:7070/api/items?categoryId=${categoryActive}`)
//                 .then(response => response.json())
//                 .then(json => {
//                     console.log(json);
//                     setItems(items.concat(json));
//                 });
//                 return
//             }
//         }, [])
//     }
//         // useEffect(() => {
//         //     if (categoryActive === "11") {
//         //         const response = fetch('http://localhost:7070/api/items')
//         //         .then(response => response.json())
//         //         .then(json => {
//         //             console.log(json);
//         //             setItems(items.concat(json));
//         //         });
//         //         return
//         //     } else {
//         //         const response = fetch(`http://localhost:7070/api/items?categoryId=${categoryActive}`)
//         //         .then(response => response.json())
//         //         .then(json => {
//         //             console.log(json);
//         //             setItems(items.concat(json));
//         //         });
//         //         return
//         //     }
//         // }, [])
//     // }

//         // const requestMainPageCatalog = async () => {
//         //     if (categoryActive === "11") {
//         //         const response = await fetch('http://localhost:7070/api/items')
//         //         .then(response => response.json())
//         //         .then(json => {
//         //             console.log(json);
//         //             setItems(items.concat(json));
//         //         });
//         //         return
//         //     } else {
//         //         const response = await fetch(`http://localhost:7070/api/items?categoryId=${categoryActive}`);
//         //         return await response.json();
//         //     }
//         // }    
    
//     // const requestMainPageCatalog = async () => {
//     //     if (categoryActive === "11") {
//     //         const response = await fetch('http://localhost:7070/api/items')
//     //         return await response.json();
//     //     } else {
//     //         const response = await fetch(`http://localhost:7070/api/items?categoryId=${categoryActive}`);
//     //         return await response.json();
//     //     }
//     // }

//     const loadMoreRequest = async () => {
//         if (categoryActive === "11") {
//             const response = await fetch(`http://localhost:7070/api/items?offset=${count}`)
//                 .then(response => response.json())
//                 .then(json => {
//                     setItems(items.concat(json));
//                 });
//                 setCount(count + 6);
//                 return
//         } else {
//             const response = await fetch(`http://localhost:7070/api/items?categoryId=${categoryActive}&offset=${count}`)
//                 .then(response => response.json())
//                 .then(json => {
//                     setItems(items.concat(json));
//                 });
//                 setCount(count + 6);
//                 return
//         }
//     }

    // const searchRequest = async (e) => {
    //     e.preventDefault();
    //     setItems([]);
    //     console.log('ok')
    //         const response = await fetch('http://localhost:7070/api/items?q=принц')
    //             .then(response => response.json())
    //             .then(json => {
    //                 console.log(json);
    //                 setItems(items.concat(json));
    //             });
    //             // return 
    // }

//     console.log(items);

//     return (
//         <section className="catalog container">
//             <h2 className="text-center">Каталог</h2>
//             {/* <ul className="catalog-categories nav justify-content-center">
//                 {categoryNames.map((category, index) => <CategoryList key={index} props={category} categoryActive={categoryActive} activeClassCategory={activeClassCategory} />)}
//             </ul> */}
//             <Search searchRequest={searchRequest}/>
//             <Async promiseFn={requestCatalogCategories}>
//                 <Async.Fulfilled>{data => <CategoryList data={data} categoryActive={categoryActive} setCategoryActive={setCategoryActive} setItems={setItems} setCount={setCount} />}</Async.Fulfilled>
//             </Async>
//             {/* <Async promiseFn={requestMainPageCatalog}>
//                 <Async.Pending><MainPageCatalogLoader /></Async.Pending>
//                 {/* <Async.Fulfilled>{data => <CatalogCardList data={data} />}</Async.Fulfilled> */}
//                 {/* <Async.Fulfilled><CatalogCardList data={items} /></Async.Fulfilled> */}
//                 {/* <Async.Rejected>{error => <p>{error.message}</p>}</Async.Rejected> */}
//             {/* </Async> */}
//             <CatalogCardList data={items} />
//             {/* <LoadMoreButton /> */}
//             <div className="text-center">
//               <button className="btn btn-outline-primary" onClick={loadMoreRequest}>Загрузить ещё</button>
//             </div>
//         </section>
//     )
// }

// export default Catalog
