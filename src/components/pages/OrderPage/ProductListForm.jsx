import ProductSizes from "./ProductSizes";
import ProductCount from "./ProductCount";
import { useDispatch, useSelector } from "react-redux";
import { setItemInCart, cartChangeForm } from "../../../store/slice/cart/reducer";
import { useNavigate } from 'react-router-dom';

const ProductListForm = ({ items }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { form } = useSelector((state) => state.cart);

    const changeSize = ({ target }) => {
        dispatch(cartChangeForm({ [target.name]: target.value}));
    }

    const changeCount = (e) => {
        e.preventDefault();
        if (e.target.innerHTML === '+' && form.count < 10) {
            dispatch(cartChangeForm({ count: form.count + 1 }));
          } else if (e.target.innerHTML === '-' && form.count > 1) {
            dispatch(cartChangeForm({ count: form.count - 1 }));
        }
    }

    const addProductInCart = (e) => {
        e.preventDefault();
        dispatch(setItemInCart({
            id: items.id,
            title: items.title,
            size: form.size,
            count: form.count,
            price: items.price,
            totalPrice: items.price * form.count,
        }));
        dispatch(cartChangeForm({ size: null, count: 1 }));
        navigate('/cart.html');
    }

    return (
        <>
            <form className="product-list-form">
                {items.sizes.map((item, key) => 
                    item.available && (
                        <ProductSizes
                        item={item}
                        form={form}
                        key={key}
                        changeSize={changeSize}
                        />
                    ),
                )}
            </form>
            {form.size !== null && 
                <>
                    <ProductCount 
                    changeCount={changeCount} 
                    form={form} 
                    />
                    <button
                        className="btn btn-danger btn-block btn-lg"
                        onClick={addProductInCart}
                        type="button"
                        >
                        В корзину
                    </button>
                </>
            }
        </>
    )
}

export default ProductListForm