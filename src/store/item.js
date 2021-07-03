import { createSlice } from "@reduxjs/toolkit";

const item = createSlice({
  name: "item",
  initialState: { items: [], totalPrice: 0, totalQuantity: 0 },
  reducers: {
    addHandler(state, action) {
      const newItem = action.payload;

      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem && newItem.amount) {
        state.items.push({
          title: newItem.title,
          amount: newItem.amount,
          image: newItem.image,
          star: newItem.star,
          quantity: newItem.quantity,
          id: newItem.id,
        });
        state.totalPrice += newItem.amount;
          state.totalQuantity++;
        
      }

      if (existingItem) {
          state.totalQuantity++;
        existingItem.quantity++;
        state.totalPrice += existingItem.amount;
      }
    },
    removeHandler(state, action) {
      const id = action.payload.id;
      const amount = action.payload.amount;
      const quantity = action.payload.quantity;

      const existingItem = state.items.find((item) => item.id === id);
        state.totalPrice -= amount;
        state.totalQuantity--;

      if (quantity === 1) {
        const array = state.items.filter((item) => item.id !== id);
        state.items = array;
      } else {
        existingItem.quantity -= 1;
      }
    },
    clearHandler(state) {
      state = { items: [], totalPrice: 0, totalQuantity: 0 };
    },
  },
});

export const itemActions = item.actions;

export default item;
