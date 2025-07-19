import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import Cart from "../pages/cart/Cart";
import OrderPlaced from "../pages/cart/OrderPlaced";
import WishList from "../pages/wishlist/WishList";
import RootLayout from "../layout/RootLayout";
import CategoryPage from "../pages/home/CategoryPage";
import Orders from "../pages/orders/Orders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/wishlist",
        element: <WishList />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/orderplaced",
        element: <OrderPlaced />,
      },
      {
        path: "/category/:title",
        element: <CategoryPage />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
    ],
  },
]);
