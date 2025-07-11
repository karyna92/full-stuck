import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import userPage from "./pages/userPage";
import ShopLayout from "./components/Layout";
import './App.css'

function App() {

  const [user, setUser] = useState(null);

  return (
    <>
      <BrowserRouter>
        <ShopLayout>
          <Routes>
            <Route path="/" element={<Home sendUser={setUser} />} />
            <Route path="user" element={<userPage user={user} />} />
          </Routes>
        </ShopLayout>
      </BrowserRouter>
    </>
  );
}

export default App
