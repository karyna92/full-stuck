import React, { useState, useEffect } from "react";
import { getAllProducts } from "../api/productApi";
import ProductsList from "../components/Products/ProductsList";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts(currentPage);
        if (data) {
          setProducts(data.data);
          setCurrentPage(data.currentPage);
          setTotalPages(data.totalPages);
        }
      } catch (err) {
        setError(err.message || "Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Welcome to Our Shop</h1>
      <ProductsList products={products} />
    </div>
  );
};

export default Home;
