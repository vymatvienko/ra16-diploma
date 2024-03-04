import CategoryListItems from "./CategoryListItems";

const CategoryList = ({ data, categoryActive, setCategoryActive, setCount, setItems, setUpdate, update, setNewCards }) => {
    // console.log({data});

    const activeClassCategory = (e, category, setCount, setItems) => {
        e.preventDefault();
        setCategoryActive(category);
        setCount(6);
        setItems([]);
        setUpdate(update + 1);
        setNewCards(0);
    }

    const allCategories = { title: 'Все', id: '11' };

    return (
        <>
            <ul className="catalog-categories nav justify-content-center">
                <li className="nav-item">
                    <a className={categoryActive === allCategories.id ? "nav-link active" : "nav-link"} onClick={e => activeClassCategory(e, allCategories.id, setCount, setItems)}>{allCategories.title}</a>
                </li>
                {data.map((category) => <CategoryListItems key={category.id} props={category} categoryActive={categoryActive} setCategoryActive={setCategoryActive} setCount={setCount} setItems={setItems} setUpdate={setUpdate} update={update} setNewCards={setNewCards}/>)}
            </ul>
        </>
    )
}

export default CategoryList