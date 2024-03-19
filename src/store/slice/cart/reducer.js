import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        form: { size: null, count: 1 },
        itemsInCart: [],
        userForm: { phone: '', address: ''},
        submitForm: {
            owner: {
                phone: '',
                address: '',
            },
            items: []
        },
    },
    reducers: {
        setItemInCart: (state, action) => {
            state.itemsInCart.push(action.payload);
            
        },
        deleteItemFromCart: (state, action) => {
            state.itemsInCart = state.itemsInCart.filter(
                item => item.id !== action.payload.id && item.size !== action.payload.size
            )
        },
        cartChangeForm: (state, action) => {
            state.form = { ...state.form, ...action.payload };
        },
        changeUserForm: (state, action) => {
            state.userForm = { ...state.userForm, ...action.payload };
        },
        submitCart: (state, action) => {
            state.submitForm = {
                owner: {
                    phone: state.userForm.phone,
                    address: state.userForm.address,
                },
                items: state.itemsInCart.map((item) => (
                    { id: item.id, price: item.totalPrice, count: item.count }
                ))
            }
        }
    }
})

export const { 
    setItemInCart, 
    deleteItemFromCart, 
    cartChangeForm,
    changeUserForm,
    submitCart,
} = cartSlice.actions;

export default cartSlice.reducer
