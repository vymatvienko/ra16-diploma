const CategoryListItems = ({ props, categoryActive, setCategoryActive, setCount, setItems, setUpdate, update, setNewCards }) => {
    
    const activeClassCategory = (e, category) => {
        e.preventDefault();
        setCategoryActive(category);
        setCount(6);
        setItems([]);
        setUpdate(update + 1);
        setNewCards(0);
    }

    return (
        <li className="nav-item">
            <a className={categoryActive === props.id ? "nav-link active" : "nav-link"} onClick={e => activeClassCategory(e, props.id)}>{props.title}</a>
        </li>
    )
}

export default CategoryListItems