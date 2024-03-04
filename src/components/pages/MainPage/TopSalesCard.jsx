import { Link } from "react-router-dom";

const TopSalesCard = ({ props }) => {
    // console.log(props);
    return (
        <div className="col-4">
            <div className="card catalog-item-card">
                <img src={props.images[0]}
                className="card-img-top img-fluid" alt={props.title} />
                <div className="card-body">
                <p className="card-text">{props.title}</p>
                <p className="card-text">{`${props.price} руб.`}</p>
                {/* <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a> */}
                <a href="/catalog/:id.html" className="btn btn-outline-primary">Заказать</a>
                {/* <Link to={`/catalog/:${props.id}.html`} className="btn btn-outline-primary">Заказать</Link> */}
                </div>
            </div>
        </div>
    )
}

export default TopSalesCard