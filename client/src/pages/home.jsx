import React from "react";
import ProductsList from "../components/Products/ProductsList";

const Home = ({
  products,
  currentPage,
  setCurrentPage,
  totalPages,
  setTotalPages,
  setProducts,
  setError,
  setLoading,
}) => {
  // These handlers update current page, and App should react to that change and fetch new data.
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
