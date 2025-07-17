import React, { useState} from "react";
import UserProfile from '../components/User/userProfile';
import PersonalInfo from '../components/User/personalInfo';
import CartList from "../components/Cart/CartList"; 
// import "./styles.css";

const UserPage = ({ user }) => {
   const [activeSection, setActiveSection] = useState("");
   console.log(user)

  
    return (
      <div>
        <UserProfile user={user} />

        <div>
          <button onClick={() => setActiveSection("info")}>
            Personal Info
          </button>
          <button onClick={() => setActiveSection("settings")}>
            Account Settings
          </button>
          <button onClick={() => setActiveSection("orders")}>Orders</button>
          <button onClick={() => setActiveSection("cart")}>Cart</button>
          <button onClick={() => console.log("Logout logic here")}>
            Logout
          </button>
        </div>

        <section>
          {activeSection === "info" && (
            <div>
              <p>Your personal information </p>
              <PersonalInfo user={user} />
            </div>
          )}

          {activeSection === "settings" && (
            <div>
              <h2>Account Settings</h2>
              <p>Here you can update your profile, password, etc.</p>
            </div>
          )}

          {activeSection === "orders" && (
            <div>
              <h2>Your Orders</h2>
              <p>Show list of orders here...</p>
            </div>
          )}

          {activeSection === "cart" && (
            <div>
              <h2>Your Cart</h2>
              <p>Show cart contents here...</p>
              <CartList user={user} />
            </div>
          )}
        </section>
      </div>
    );
};

export default UserPage;
