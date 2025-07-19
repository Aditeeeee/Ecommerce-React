import type { ProductType } from "./globalInterfaces";

// types/authTypes.ts
export interface User {
  userId: string;
  username: string;
  email: string;
  password: string;
}

export interface ErrorState {
  registerError: string | null;
  loginError: string | null;
  forgetError: string | null;
}

export interface RecentlyBrowsedItem {
  id: number | string;
  userId: string;
}

export interface AuthState {
  users: User[];
  isAuthenticated: boolean;
  currentUser: Partial<User>;
  recentlyBrowsed: RecentlyBrowsedItem[];
  error: ErrorState;
}

// types/cartTypes.ts
export interface CartItem {
  id: number | string;
  userId: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  userId: string;
  orderDate: string;
  deliveryDate: string;
}

export interface CartState {
  cartItems: CartItem[];
  orders: Order[];
}

// types/wishlistTypes.ts
export interface WishlistItem extends ProductType {
  userId: string;
}

export interface WishlistState {
  wishlist: WishlistItem[];
  error: string | null;
}
