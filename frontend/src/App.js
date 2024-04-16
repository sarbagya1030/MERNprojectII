import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//import all components
import Dashboard from "./components/Dashboard.js";
import Username from "./components/Username";
import Password from "./components/Password";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Recovery from "./components/Recovery";
import Reset from "./components/Reset";
import PageNotFound from "./components/PageNotFound";
import ProductPost from "./components/ProductPost.js";
import StartPage from "./components/startpage.js";
import ViewPosts from "./components/ViewPosts.js";
import ProductCard from "../src/components/productcard.js";
import Sortinglist from "./components/line.js";
import AdminDash from "./components/adminDash.js";
import UpdateProduct from "./components/updateProduct.js";
import DeleteProducts from "./components/delProduct.js";
import DeleteUser from "./components/delUser.js";

//auth middleware
import { AuthorizeUser, ProtectRoute } from "./middleware/auth.js";

/** root routes */
const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage />,
  },
  {
    path: "/username",
    element: <Username></Username>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/password",
    element: (
      <ProtectRoute>
        <Password />
      </ProtectRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <AuthorizeUser>
        <Profile />
      </AuthorizeUser>
    ),
  },
  {
    path: "/recovery",
    element: <Recovery></Recovery>,
  },
  {
    path: "/reset",
    element: <Reset></Reset>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
  {
    path: "/post",
    element: <ProductPost></ProductPost>,
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Dashboard />
        <Sortinglist />
        <ProductCard />
      </>
    ),
  },
  {
    path: "/view",
    element: (
      <>
        <Dashboard></Dashboard>
        <ViewPosts></ViewPosts>
      </>
    ),
  },
  {
    path: "/update-product/:productId",
    element: <UpdateProduct />,
  },
  {
    path: "/admin",
    element: (
      <>
        <AdminDash />
      </>
    ),
  },
  {
    path: "/admin/manageproducts",
    element: (
      <>
        <DeleteProducts />
      </>
    ),
  },
  {
    path: "/admin/manageusers",
    element: (
      <>
        <DeleteUser />
      </>
    ),
  },
]);

export default function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}
