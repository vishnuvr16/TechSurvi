import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {}
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const id = product.id;
      if (!state.items[id]) {
        state.items[id] = { product, quantity: 1 };
      } else {
        state.items[id].quantity += 1;
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      delete state.items[id];
    },
    changeQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      if (state.items[id]) {
        state.items[id].quantity = Math.max(1, quantity);
      }
    },
    clearCart: (state) => {
      state.items = {};
    }
  }
});

export const { addToCart, removeFromCart, changeQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
