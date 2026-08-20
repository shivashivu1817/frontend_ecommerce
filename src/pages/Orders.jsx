import React, { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

    try {

      const response =
        await API.get("orders/");

      setOrders(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="container mt-4">

      <h2>My Orders</h2>

      {orders.length === 0 ? (

        <h4>No Orders Found</h4>

      ) : (

        orders.map((order) => (

          <div
            key={order.id}
            className="card p-3 mb-3"
          >

            <h5>
              Order #{order.id}
            </h5>

            <p>
              Amount:
              ₹ {order.total_amount}
            </p>

            <p>
              Status:
              {order.status}
            </p>

          </div>

        ))

      )}

    </div>
  );
}

export default Orders;