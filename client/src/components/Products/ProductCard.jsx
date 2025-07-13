import React from "react";
import "./products.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      {product.image && (
        <div className="image-container">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </div>
      )}
      <p>{product.description}</p>
      <p>
        <strong>Price:</strong> ${product.price.toFixed(2)}
      </p>
    </div>
  );
};

export default ProductCard;
