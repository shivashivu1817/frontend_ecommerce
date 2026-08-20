import React, { useEffect, useState } from "react";
import API from "../services/api";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await API.get("cart/");
      setCartItems(response.data);
      calculateTotal(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotal = (items) => {
    let sum = 0;

    items.forEach((item) => {
      sum += Number(item.product_price) * item.quantity;
    });

    setTotal(sum);
  };

  const increaseQuantity = async (item) => {
    try {
      await API.put(
        `cart/${item.id}/update/`,
        {
          product: item.product,
          quantity: item.quantity + 1,
        }
      );

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQuantity = async (item) => {
    if (item.quantity <= 1) return;

    try {
      await API.put(
        `cart/${item.id}/update/`,
        {
          product: item.product,
          quantity: item.quantity - 1,
        }
      );

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id) => {
    try {
      await API.delete(
        `cart/${id}/delete/`
      );

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };
const placeOrder = async () => {

  try {

    await API.post(
      "orders/",
      {
        total_amount: total,
      }
    );

    // Clear Cart
    for (const item of cartItems) {

      await API.delete(
        `cart/${item.id}/delete/`
      );

    }

    alert(
      "Order Placed Successfully"
    );

    setCartItems([]);
    setTotal(0);

    window.location.href =
      "/orders";

  } catch (error) {

    console.log(error);

    alert(
      "Failed To Place Order"
    );

  }

};

  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        Shopping Cart
      </h2>

      {cartItems.length === 0 ? (

        <h3>Cart Empty</h3>

      ) : (

        <>
          {cartItems.map((item) => (

            <div
              key={item.id}
              className="card mb-3 p-3"
            >

              <h5>{item.product_name}</h5>

              <h6>₹ {item.product_price}</h6>

              <div className="d-flex align-items-center">

                <button
                  className="btn btn-danger"
                  onClick={() =>
                    decreaseQuantity(item)
                  }
                >
                  -
                </button>

                <span className="mx-3">
                  {item.quantity}
                </span>

                <button
                  className="btn btn-success"
                  onClick={() =>
                    increaseQuantity(item)
                  }
                >
                  +
                </button>

              </div>

              <p className="mt-3">
                Subtotal:
                ₹
                {
                  Number(item.product_price) *
                  item.quantity
                }
              </p>

              <button
                className="btn btn-outline-danger"
                onClick={() =>
                  removeItem(item.id)
                }
              >
                Remove
              </button>

            </div>

          ))}

          <div className="card p-3 bg-light">

            <h3>
              Total : ₹ {total}
            </h3>

            <button
              className="btn btn-primary"
              onClick={placeOrder}
            >
              Place Order
            </button>

          </div>

        </>

      )}

    </div>
  );
}

export default Cart;