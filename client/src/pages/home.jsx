import React, { useState, useEffect } from "react";

const Home = (props) => {
    const [products, setProducts] = useState({});
  return (
    <div>
      <h1>Welcome to Our Course Platform</h1>
      <p>Learn, grow, and achieve your goals with us.</p>
    </div>
  );
};

export default Home;
