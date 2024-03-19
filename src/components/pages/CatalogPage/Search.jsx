const Search = ({ onSearch }) => {

    const onSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const input = form.elements.request;

        onSearch(input.value);
    }

    return (
        <form className="catalog-search-form form-inline container" onSubmit={onSubmit}>
            <input className="form-control" type="text" placeholder="Поиск" name="request" />
        </form>
    )
}

export default Search