import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import UserPage from "./pages/userPage";
import ShopLayout from "./components/Layout";
import LoginModal from "./components/Login/LoginModal";
import ProductPage from "./pages/product";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loginModal, setLoginModal] = useState(false);

  return (
    <BrowserRouter>
      <ShopLayout user={user} onLoginClick={() => setLoginModal(true)}>
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route
            path="/products/:id"
            element={<ProductPage user={user} setLoginModal ={setLoginModal} />}
          />
          <Route path="/user" element={<UserPage user={user} />} />
        </Routes>

        {loginModal && (
          <LoginModal
            isOpen={loginModal}
            onClose={() => setLoginModal(false)}
            sendUser={(userData) => {
              console.log("Received user in App:", userData);
              setUser(userData.user);
              setLoginModal(false);
            }}
          />
        )}
      </ShopLayout>
    </BrowserRouter>
  );
}

export default App;
