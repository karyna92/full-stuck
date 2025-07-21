

import { Link } from "react-router-dom";
import "./admin.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2 className="admin-title">Admin Panel</h2>
        <nav className="admin-nav">
          <Link to="/admin">📊 Dashboard</Link>
          <Link to="/admin/products">📦 Products</Link>
          <Link to="/admin/orders">📄 Orders</Link>
          <Link to="/admin/users">👥 Users</Link>
        </nav>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
};

export default AdminLayout;

