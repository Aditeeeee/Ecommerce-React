import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  WishlistItem,
  WishlistState,
} from "../interfaces/SliceInterfaces";

const initialState: WishlistState = {
  wishlist: [],
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList: (state, action: PayloadAction<WishlistItem>) => {
      const { id, userId } = action.payload;

      const existingItem = state.wishlist.find(
        (item) => item.id === id && item.userId === userId
      );

      if (!existingItem) {
        state.wishlist.push(action.payload);
      } else {
        state.error = "Item already added to your wishlist";
      }
    },
    removeFromWishList: (
      state,
      action: PayloadAction<{ id: number | string; userId: string }>
    ) => {
      const { id, userId } = action.payload;
      state.wishlist = state.wishlist.filter(
        (item) => !(item.id === id && item.userId === userId)
      );
    },
  },
});

export const { addToWishList, removeFromWishList } = wishlistSlice.actions;

export default wishlistSlice.reducer;
