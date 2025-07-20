import React from "react";
import "./orders.css";

const OrderCard = ({ order }) => {
  if (!order) {
    return <div className="order-card">Invalid order data.</div>;
  }

  const {
    _id,
    status,
    paymentMethod,
    paymentStatus,
    deliveryStatus,
    total,
    deliveryAddress,
    createdAt,
    products,
  } = order;

  return (
    <div className="order-card">
      <h3>Order ID: {_id || "N/A"}</h3>
      <p>
        <strong>Status:</strong> {status || "N/A"}
      </p>
      <p>
        <strong>Payment Method:</strong> {paymentMethod || "N/A"}
      </p>
      <p>
        <strong>Payment Status:</strong> {paymentStatus || "N/A"}
      </p>
      <p>
        <strong>Delivery Status:</strong> {deliveryStatus || "N/A"}
      </p>
      <p>
        <strong>Total Amount:</strong> ${Number(total || 0).toFixed(2)}
      </p>
      <p>
        <strong>Delivery Address:</strong> {deliveryAddress || "N/A"}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {createdAt ? new Date(createdAt).toLocaleString() : "N/A"}
      </p>

      <div>
        <strong>Products:</strong>
        {Array.isArray(products) && products.length > 0 ? (
          <ul>
            {products.map((item, index) => (
              <li key={item.product || item._id || index}>
                Product ID: {item.product || "Unknown"} | Quantity:{" "}
                {item.quantity || 0}
              </li>
            ))}
          </ul>
        ) : (
          <p>No products in this order.</p>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
