import React from "react";
import ProductCard from "../Products/ProductCard"; 
import "./styles.css";

const SimilarProducts = ({ products }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="similar-products">
      <h2>Similar Products</h2>
      <div className="similar-products-list">
        {products.map((product) => (
          <div key={product._id} className="similar-product-item">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
