import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./layout.css";

const ShopLayout = ({ children, user, onLoginClick, onBotClick }) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    if (!user) {
      onLoginClick();
      return;
    }

    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };

  return (
    <div className="layout-container">
      <header className="header">
        <div>
          <h1 className="site-title">ElectroShop</h1>
          <div className="logo">🌿</div>
        </div>
        <nav className="nav-menu">
          <Link to="/">Home</Link>
          <button onClick={handleUserClick} className="nav-button">
            {user?.firstName || "UserProfile"}
          </button>
        </nav>
      </header>

      <main className="main-content">{children}</main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} CourseHub. All rights reserved.</p>
        <div className="footer-links">
          <button onClick={onBotClick}>💬 Chat with Support Bot</button>
          <a href="/privacy">Privacy Policy</a>
          <span>|</span>
          <a href="/terms">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default ShopLayout;
