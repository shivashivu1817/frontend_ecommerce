import React, { useState } from "react";
import API from "../services/api";

function ProductCard({ product }) {

  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async () => {
    try {

      await API.post(
        "cart/",
        {
          product: product.id,
          quantity: quantity,
        }
      );

      alert("Product Added To Cart");

    } catch (error) {

      console.log(error.response?.data);

      alert("Failed To Add Cart");

    }
  };

  return (
    <div className="card shadow h-100">

      <div className="card-body">

        <h5>{product.name}</h5>

        <p>{product.description}</p>

        <h4>₹ {product.price}</h4>

        <div className="d-flex align-items-center mb-3">

          <button
            className="btn btn-danger"
            onClick={decreaseQty}
          >
            -
          </button>

          <span
            className="mx-3 fw-bold"
          >
            {quantity}
          </span>

          <button
            className="btn btn-success"
            onClick={increaseQty}
          >
            +
          </button>

        </div>

        <button
          className="btn btn-primary w-100"
          onClick={addToCart}
        >
          Add To Cart
        </button>

      </div>

    </div>
  );
}

export default ProductCard;