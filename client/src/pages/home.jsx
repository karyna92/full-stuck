import React, { useState, useEffect } from "react";
import { getAllProducts } from "../api/productApi";
import ProductsList from "../components/Products/ProductsList";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const prevButtonHandler = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextButtonHandler = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts(currentPage);
        if (data?.data && data?.currentPage && data?.totalPages) {
          setProducts(data.data);
          setCurrentPage(data.currentPage);
          setTotalPages(data.totalPages);
        } else {
          throw new Error("Invalid response format");
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
    <>
      <div>
        <h1>Welcome to Our Shop</h1>
        <ProductsList products={products} />
      </div>
      <div>
        <button onClick={prevButtonHandler} disabled={currentPage === 1}>
          Prev
        </button>

        <button
          onClick={nextButtonHandler}
          disabled={currentPage === totalPages}
        >
          {currentPage < totalPages
            ? `Next (${totalPages - currentPage})`
            : "Next"}
        </button>
      </div>
    </>
  );
};

export default Home;
