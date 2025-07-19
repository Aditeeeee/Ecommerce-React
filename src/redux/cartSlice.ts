import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CartState } from "../interfaces/SliceInterfaces";

const initialState: CartState = {
  cartItems: [],
  orders: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      const { id, userId } = action.payload;

      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === id && item.userId === userId
      );

      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity += 1;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    removeFromCart(
      state,
      action: PayloadAction<{ id: number | string; userId: string }>
    ) {
      const { id, userId } = action.payload;

      state.cartItems = state.cartItems.filter(
        (item) => !(item.id === id && item.userId === userId)
      );
    },

    decreaseQuantity(
      state,
      action: PayloadAction<{ id: number | string; userId: string }>
    ) {
      const { id, userId } = action.payload;

      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === id && item.userId === userId
      );

      if (itemIndex !== -1) {
        if (state.cartItems[itemIndex].quantity > 1) {
          state.cartItems[itemIndex].quantity -= 1;
        } else {
          state.cartItems.splice(itemIndex, 1);
        }
      }
    },

    addtoOrders(
      state,
      action: PayloadAction<{ cartItems: CartItem[]; userId: string }>
    ) {
      const { cartItems, userId } = action.payload;

      const datePlaced = new Date();
      const deliveryDate = new Date(
        datePlaced.getTime() +
          Math.floor(Math.random() * 5 + 2) * 24 * 60 * 60 * 1000
      );

      const order = {
        id: `ORD-${Date.now()}`,
        items: cartItems,
        userId,
        orderDate: datePlaced.toISOString(),
        deliveryDate: deliveryDate.toISOString(),
      };

      state.orders.push(order);
    },

    clearCart(state, action: PayloadAction<{ userId: string }>) {
      const { userId } = action.payload;

      state.cartItems = state.cartItems.filter(
        (item) => item.userId !== userId
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  decreaseQuantity,
  addtoOrders,
} = cartSlice.actions;

export default cartSlice.reducer;
