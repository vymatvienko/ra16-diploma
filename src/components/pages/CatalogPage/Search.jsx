const Search = ({ searchRequest, input, setInput }) => {

    const onChange = (e) => {
        setInput(prevForm => ({...prevForm, input: e.target.value}));
    }

    return (
        <form className="catalog-search-form form-inline container" onSubmit={searchRequest}>
            <input className="form-control" type="text" placeholder="Поиск" onChange={onChange} value={input} />
        </form>
    )
}

export default Search