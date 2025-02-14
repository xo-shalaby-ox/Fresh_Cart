import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "./../node_modules/@tanstack/react-query-devtools/src/index";
import Layout from "./Components/Layout/Layout";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import CartContextProvider from "./Context/CartContext";
import UserContextProvider from "./Context/UserContext";
import Login from "./Pages/Auth/Login/Login";
import Signup from "./Pages/Auth/Signup/Signup";
import Brands from "./Pages/Brands/Brands";
import Cart from "./Pages/Cart/Cart";
import Categories from "./Pages/Categories/Categories";
import Contacts from "./Pages/Contacts/Contacts";
import Home from "./Pages/Home/Home";
import Notfound from "./Pages/Notfound/Notfound";
import Products from "./Pages/Products/Products";
import CategoryDetails from "./Components/CategoryDetails/CategoryDetails";
import BrandsDetails from "./Components/BrandsDetails/BrandsDetails";
import Wishlist from "./Pages/Wishlist/Wishlist";
import WishlistContextProvider from "./Context/WishlistContext";
import ForgetPassword from "./Pages/Auth/ForgetPassword/ForgetPassword";
import VerifyCode from "./Pages/Auth/VerifyResetCode/VerfiyCode";
import ResetPassword from "./Pages/Auth/ResetPassword/ResetPassword";
import CheckOut from "./Pages/CheckOut/CheckOut";
import AllOrders from "./Components/AllOrders/AllOrders";

let query = new QueryClient();
let Routing = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "Categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkOut",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/categoryDetails/:id",
        element: (
          <ProtectedRoute>
            <CategoryDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/brandsDetails/:id",
        element: (
          <ProtectedRoute>
            <BrandsDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "contacts",
        element: (
          <ProtectedRoute>
            <Contacts />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "forgetPassword", element: <ForgetPassword /> },
      { path: "verifyResetCode", element: <VerifyCode /> },
      { path: "resetPassword", element: <ResetPassword /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
function App() {
  return (
    <>
      <UserContextProvider>
        <QueryClientProvider client={query}>
          <CartContextProvider>
            <WishlistContextProvider>
              <RouterProvider router={Routing}></RouterProvider>
              <Toaster />
            </WishlistContextProvider>
          </CartContextProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
