import { useEffect, useState } from "react";
import AdminOrders from "../components/Admin/adminOrders";
import {getAllOrders} from '../api/productApi';

const AdminDashboard = ({ user }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchOrders();
  }, []);

 return (
   <div>
     <h2>Admin Dashboard</h2>
     <AdminOrders orders={orders} />
   </div>
 );


};

export default AdminDashboard;
