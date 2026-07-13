import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../feature/productSlice/productSlice"
import categoryReducer from "../feature/categorySlice/categorySlice";
import cartReducer from "../feature/cartSlice/cartSlice";

const store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoryReducer,
        cart: cartReducer,
    },
});

store.subscribe(() => {
    try {
        localStorage.setItem('cartItems', JSON.stringify(store.getState().cart.items));
    } catch (e) {
        console.error("Could not save cart items to localStorage", e);
    }
});

export default store;