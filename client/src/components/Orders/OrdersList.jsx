import React, { useState, useEffect } from "react";
import OrderCard from "./OrderCard";

const OrderList = ({ user }) => {
  const [orders, setOrders] = useState(user.orders || []);

 
  useEffect(() => {
    setOrders(user.orders || []);
  }, [user.orders]);

  if (!orders || orders.length === 0) {
    return <p>No orders found.</p>;
  }
console.log("orders:", orders)
  return (
    <div>
      {orders.map((order) => (
        <OrderCard key={order} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
