import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
    try {
        const stored = localStorage.getItem('cartItems');
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Failed to load cart from localStorage", e);
        return [];
    }
};

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: loadCartFromStorage(),
        isOpen: false,
        lastAddedItem: null,
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += product.quantity;
            } else {
                state.items.push(product);
            }
            state.lastAddedItem = {
                id: product.id,
                name: product.name,
                image: product.image,
                priceCents: product.priceCents,
                quantity: product.quantity,
                addedAt: Date.now()
            };
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                if (quantity < 1) {
                    state.items = state.items.filter(item => item.id !== id);
                } else {
                    item.quantity = quantity;
                }
            }
        },
        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        },
        setCartOpen: (state, action) => {
            state.isOpen = action.payload;
        },
        clearCart: (state) => {
            state.items = [];
        },
        clearLastAddedItem: (state) => {
            state.lastAddedItem = null;
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, toggleCart, setCartOpen, clearCart, clearLastAddedItem } = cartSlice.actions;
export default cartSlice.reducer;
