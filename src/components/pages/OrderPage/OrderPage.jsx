import Header from "../../Header"
import Footer from "../../Footer"
import { useParams } from "react-router-dom"
import { Async } from "react-async";
import { useEffect } from "react";
import ProductList from "./ProductList";
import Loader from "../../Loader";

const OrderPage = () => {
    const id = useParams();
    // console.log(id);

    const requestOrderPage = async () => {
        const response = await fetch(`http://localhost:7070/api/items/${id.id}`);
        return await response.json();
    }

    useEffect(() => {
        requestOrderPage()
    }, []);

    return (
        <>
            <Header />
            <Async promiseFn={requestOrderPage}>
            <Async.Pending>
                <Loader />
            </Async.Pending>
            <Async.Fulfilled>
                {data => (
                    <ProductList data={data} />
                )}
            </Async.Fulfilled>
            </Async>
            <Footer />
        </>
    )
}

export default OrderPage