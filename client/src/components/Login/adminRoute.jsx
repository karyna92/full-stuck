import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = ({ user }) => {
  if (!user) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
