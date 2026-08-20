import React from "react";


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import CreateCategory from "./pages/CreateCategory";
import CreateProduct from "./pages/CreateProduct";
import ViewCategories from "./pages/ViewCategories";
import ViewProducts from "./pages/ViewProducts";


import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />
	<Route
  	  path="/orders"
  	  element={<Orders />}
	/>
	<Route path="/create-category" element={<CreateCategory />} />
	<Route path="/create-product" element={<CreateProduct />} />
<Route
  path="/categories"
  element={<ViewCategories />}
/>
<Route
  path="/products"
  element={<ViewProducts />}
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;