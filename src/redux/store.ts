// redux/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import wishlistReducer from "./wishListSlice";
import cartReducer from "./cartSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  wishlist: wishlistReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "wishlist", "cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persistor
export const persistor = persistStore(store);

// 🔷 Type helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
