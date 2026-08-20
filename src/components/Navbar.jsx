import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

  return (

    <nav className="navbar navbar-dark bg-primary">

      <div className="container">

        <Link
          className="navbar-brand"
          to="/"
        >
          Green Threads
        </Link>

        <div>

          <Link
            to="/"
            className="btn btn-light me-2"
          >
            Home
          </Link>

          <Link
            to="/categories"
            className="btn btn-info me-2"
          >
            Categories
          </Link>

          <Link
            to="/products"
            className="btn btn-success me-2"
          >
            Products
          </Link>

          <Link
            to="/cart"
            className="btn btn-warning me-2"
          >
            Cart
          </Link>

          <Link
            to="/orders"
            className="btn btn-secondary me-2"
          >
            Orders
          </Link>

          <Link
            to="/login"
            className="btn btn-light"
          >
            Login
          </Link>
<Link to="/create-category" className="btn btn-info me-2">
  Create Category
</Link>

<Link to="/create-product" className="btn btn-success me-2">
  Create Product
</Link>

        </div>

      </div>

    </nav>

  );
}

export default Navbar;