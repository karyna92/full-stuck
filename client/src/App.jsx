import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import UserPage from "./pages/userPage";
import ShopLayout from "./components/Layout";
import LoginModal from "./components/Login/LoginModal";
import ProductDetails from "./pages/product";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loginModal, setLoginModal] = useState(false);

  return (
    <BrowserRouter>
      <ShopLayout onLoginClick={() => setLoginModal(true)} user={user}>
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/user" element={<UserPage user={user} />} />
        </Routes>

        <LoginModal
          isOpen={loginModal}
          onClose={() => setLoginModal(false)}
          sendUser={(userData) => {
            setUser(userData);
            setLoginModal(false);
          }}
        />
      </ShopLayout>
    </BrowserRouter>
  );
}

export default App;
