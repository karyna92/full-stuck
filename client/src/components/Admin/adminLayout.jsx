
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./admin.css";

const AdminLayout = ({ user }) => {
  console.log(user)

    // const navigate = useNavigate();

    // // Example logout handler or navigate to dashboard
    // const handleLogout = () => {
    //   // Add your logout logic here (e.g., clear auth, then redirect)
    //   navigate("/");
    // };
  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2 className="admin-title">Admin Panel</h2>
        <nav className="admin-nav">
          <Link to="/admin">📊 Dashboard</Link>
          <Link to="/">📦 Products</Link>
          <Link to="/admin/orders">📄 Orders</Link>
          <Link to="/admin/users">👥 Users</Link>
        </nav>
      </aside>
      <main className="admin-content">
        <header className="admin-header">
          <h1>Welcome, Admin {user.firstName}</h1>
        </header>

        <section className="admin-main-section">
          <Outlet /> {/* renders matched admin child routes */}
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;

