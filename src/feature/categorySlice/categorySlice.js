import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: "categories",
    initialState: {
        items: [],
    },
    reducers: {
        setCategories: (state, action) => {
            state.items = action.payload;
        },
    }
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
