const requestMainPageCatalog = ({ category }) => {
    if (category === "11") {
        const response = fetch('http://localhost:7070/api/items');
        return response.json();
    } else {
        const response = fetch(`http://localhost:7070/api/items?categoryId=${category}`);
        return response.json();
    }
}

export default requestMainPageCatalog