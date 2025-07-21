import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/home";
import UserPage from "./pages/userPage";
import ShopLayout from "./components/Layout";
import LoginModal from "./components/Login/LoginModal";
import ProductPage from "./pages/product";
import { authUser } from "./api/userApi";
import { getAllProducts } from "./api/productApi";
import UpdateProfile from "./components/User/UpdateProfile";
import AdminDashboard from "./pages/admin";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loginModal, setLoginModal] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  // Fetch logged-in user
  useEffect(() => {
    async function fetchUser() {
      try {
        setLoadingUser(true);
        const UserData = await authUser();
        setUser(UserData);
      } catch (error) {
        navigate("/");
      } finally {
        setLoadingUser(false);
      }
    }
    fetchUser();
  }, [navigate]);

  // Fetch products on page load and whenever currentPage changes
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoadingProducts(true);
        const data = await getAllProducts(currentPage);
        if (data?.data && data?.currentPage && data?.totalPages) {
          setProducts(data.data);
          setCurrentPage(data.currentPage);
          setTotalPages(data.totalPages);
          setError(null);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        setError(err.message || "Error fetching products");
      } finally {
        setLoadingProducts(false);
      }
    }
    fetchProducts();
  }, [currentPage]);

  if (loadingUser || loadingProducts) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ShopLayout user={user} onLoginClick={() => setLoginModal(true)}>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              user={user}
              products={products}
              setProducts={setProducts}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              setTotalPages={setTotalPages}
              setError={setError}
              setLoading={setLoadingProducts}
            />
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProductPage
              user={user}
              setLoginModal={setLoginModal}
              products={products}
            />
          }
        />
        <Route path="/user" element={<UserPage user={user} />} />
        <Route path="/:userId/update" element={<UpdateProfile user={user} />} />

        <Route
          path="/admin"
          element={
            <AdminRoute user={user}>
              <AdminDashboard user={user} />
            </AdminRoute>
          }
        />
      </Routes>

      {loginModal && (
        <LoginModal
          isOpen={loginModal}
          onClose={() => setLoginModal(false)}
          sendUser={(userData) => {
            setUser(userData);
            setLoginModal(false);
          }}
        />
      )}
    </ShopLayout>
  );
}

export default App;
