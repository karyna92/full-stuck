import React, { useState } from "react";
import "./orders.css";

const OrderCard = ({ order, user, onStatusChange }) => {
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

  const [newStatus, setNewStatus] = useState(deliveryStatus || status || "");

  const handleStatusChange = (e) => {
    const updatedStatus = e.target.value;
    setNewStatus(updatedStatus);
    if (onStatusChange) {
      onStatusChange(_id, updatedStatus);
    }
  };

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

      {user?.role === "admin" && (
        <div className="status-update">
          <label htmlFor={`status-${_id}`}>Change Delivery Status:</label>
          <select
            id={`status-${_id}`}
            value={newStatus}
            onChange={handleStatusChange}
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="in transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
