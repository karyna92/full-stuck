import React from "react";
import { Link } from "react-router-dom";
import "./layout.css";

const ShopLayout = ({ children }) => {
  return (
    <div className="layout-container">
      <header className="header">
        <div>
          <h1 className="site-title">ElectroShop</h1>
          <div className="logo">🌿</div>
        </div>
        <nav className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/user">UserProfile</Link>
        </nav>
      </header>

      <main className="main-content">{children}</main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} CourseHub. All rights reserved.</p>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <span>|</span>
          <a href="/terms">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default ShopLayout;
