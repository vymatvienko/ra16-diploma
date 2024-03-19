import { useSelector, useDispatch } from "react-redux"
import { changeUserForm, submitCart } from "../../../store/slice/cart/reducer"

const CartUserForm = () => {

    const submitForm = useSelector(state => state.cart.submitForm);
    const dispatch = useDispatch();

    const submitOrder = async (order) => {
        const response = await fetch('http://localhost:7070/api/order', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.status);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(submitCart());
        submitOrder(submitForm);
    }

    const onChange = (e) => {
        dispatch(changeUserForm({ [e.target.name]: e.target.value }));
    }

    return (
        <>
            <form className="card-body" onSubmit={onSubmit}>
                <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input className="form-control" id="phone" name="phone" placeholder="Ваш телефон" onChange={onChange} />
                </div>
                <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <input className="form-control" id="address" name="address" placeholder="Адрес доставки" onChange={onChange} />
                </div>
                <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="agreement" />
                <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                </div>
                <button type="submit" className="btn btn-outline-secondary">Оформить</button>
            </form>
        </>
    )
}

export default CartUserForm