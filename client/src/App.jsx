import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { fetchCurrentUser } from "./store/slices/userSlice";
import { getProducts, setCurrentPage } from "./store/slices/productSlice";
import { toggleLoginModal, toggleBotModal } from "./store/slices/modalSlice";
import { getAccessToken } from "./services/authService";
import Home from "./pages/home";
import UserPage from "./pages/userPage";
import ShopLayout from "./components/Layout";
import LoginModal from "./components/Login/LoginModal";
import ProductPage from "./pages/product";
import AddProductPage from "./pages/addProduct";
import UpdateProfile from "./components/User/UpdateProfile";
import AdminDashboard from "./pages/admin";
import AdminOrders from "./components/Admin/adminOrders";
import AdminRoute from "./components/Login/adminRoute";
import AdminLayout from "./components/Admin/adminLayout";
import EditProductPage from "./pages/editProduct";
import SupportChatModal from "./components/TelegramBot/telegramBot";
import "./App.css";

function App() {
  const dispatch = useDispatch();

 const {
  user,
   isLoading: loadingUser,
   error: userError,
 } = useSelector((state) => state.user);

 const {
   products,
   currentPage,
   totalPages,
   isLoading: loadingProducts,
   error: productsError,
 } = useSelector((state) => state.products);

const {loginModal, botModal } = useSelector((state) => state.modal);


useEffect(() => {
  if (getAccessToken()) {
    dispatch(fetchCurrentUser());
  }
}, [dispatch]);



    useEffect(() => {
      dispatch(getProducts(currentPage));
    }, [dispatch, currentPage]);

  if (loadingUser || loadingProducts) return <div>Loading...</div>;
  if (userError || productsError)
    return <div>{userError || productsError}</div>;

  return (
    <ShopLayout
      user={user}
      onLoginClick={() => dispatch(toggleLoginModal())}
      onBotClick={() => dispatch(toggleBotModal())}
    >
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <Home
              user={user}
              products={products}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={(page) => dispatch(setCurrentPage(page))}
            />
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProductPage
              user={user}
              onLogin={() => loginModal()}
              products={products}
            />
          }
        />
        <Route path="/products/new" element={<AddProductPage />} />
        <Route
          path="/products/edit/:id"
          element={<EditProductPage user={user} products={products} />}
        />
        <Route path="/user" element={<UserPage user={user} />} />
        <Route path="/:userId/update" element={<UpdateProfile user={user} />} />

        {/* Admin protected routes */}
        <Route element={<AdminRoute user={user} />}>
          <Route element={<AdminLayout user={user} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            {/* Add more admin routes here */}
          </Route>
        </Route>
      </Routes>

      {loginModal && (
        <LoginModal
          isOpen={loginModal}
          onClose={() => dispatch(toggleLoginModal())}
        />
      )}
      {botModal && (
        <SupportChatModal
          isOpen={botModal}
          onClose={() => dispatch(toggleBotModal())}
        />
      )}
    </ShopLayout>
  );
}

export default App;


  // const [user, setUser] = useState(null);
  // const [products, setProducts] = useState([]);
  // const [loginModal, setLoginModal] = useState(false);
  // const [botModal, setBotModal] = useState(false);
  // const [loadingUser, setLoadingUser] = useState(false);
  // const [loadingProducts, setLoadingProducts] = useState(false);
  // const [error, setError] = useState(null);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   async function fetchUser() {
  //     try {
  //       setLoadingUser(true);
  //       const UserData = await authUser(navigate);
  //       setUser(UserData || null);
  //     } catch (error) {
  //       console.error("Failed to authenticate user:", error);
  //       setUser(null);
  //     } finally {
  //       setLoadingUser(false);
  //     }
  //   }
  //   fetchUser();
  // }, []);

    // useEffect(() => {
    //   async function fetchProducts() {
    //     try {
    //       setLoadingProducts(true);
    //       const data = await getAllProducts(currentPage);
    //       if (data?.data && data?.currentPage && data?.totalPages) {
    //         setProducts(data.data);
    //         setCurrentPage(data.currentPage);
    //         setTotalPages(data.totalPages);
    //         setError(null);
    //       } else {
    //         throw new Error("Invalid response format");
    //       }
    //     } catch (err) {
    //       setError(err.message || "Error fetching products");
    //     } finally {
    //       setLoadingProducts(false);
    //     }
    //   }
    //   fetchProducts();
    // }, [currentPage]);