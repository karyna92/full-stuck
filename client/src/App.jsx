import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import Home from "./pages/home";
import UserPage from "./pages/userPage";
import ShopLayout from "./components/Layout";
import LoginModal from "./components/Login/LoginModal";
import ProductPage from "./pages/product";
import history from "./BrowserHistory";
import { authUser } from "./api/userApi";
import UpdateProfile from "./components/User/UpdateProfile";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loginModal, setLoginModal] = useState(false);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  async function fetchUser() {
    try {
      setLoading(true);
      const UserData = await authUser();
      setUser(UserData);
    } catch (error) {
     return history.push("/");
    }  finally {
      setLoading(false);
    }
  }
    fetchUser();
}, []);

if (loading) return <div>Loading user...</div>;

  return (
    <HistoryRouter history={history}>
      <ShopLayout user={user} onLoginClick={() => setLoginModal(true)}>
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route
            path="/products/:id"
            element={<ProductPage user={user} setLoginModal={setLoginModal} />}
          />
          <Route path="/user" element={<UserPage user={user} />} />
          <Route path="/avatar/:userId" element={<UpdateProfile />} />
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
    </HistoryRouter>
  );
}

export default App;
