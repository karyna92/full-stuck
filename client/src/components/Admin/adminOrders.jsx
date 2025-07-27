
import React from "react";
import OrderCard from "../Orders/OrderCard";
import "./admin.css"; 


const AdminOrders = ({ orders, user }) => {
      if (!Array.isArray(orders)) {
        return <p>No orders to show</p>;
      }
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // You’ll need an API call like:
      // await updateOrderStatus(orderId, newStatus);
      console.log(`Update order ${orderId} to ${newStatus}`);
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      {orders.map((order) => (
        <OrderCard
          key={order._id}
          order={order}
          user={user}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
};

export default AdminOrders;