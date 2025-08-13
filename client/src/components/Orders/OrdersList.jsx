import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "./OrderCard";
import { fetchOrdersByUser } from "../../store/slices/orderSlice";

const OrderList = ({ user }) => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (user) {
      dispatch(fetchOrdersByUser());
    }
  }, [dispatch, user]);

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!orders.length) return <p>No orders found.</p>;

  return (
    <div>
      {orders.map((order) => (
        <OrderCard key={order._id || order.id} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
