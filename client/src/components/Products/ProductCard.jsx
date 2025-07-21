import React from "react";
import { Link } from "react-router-dom";
import "./products.css";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`} className="product-card-link">
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
        <div>
          <p>{product.description}</p>
          <p>
            <strong>Price:</strong> ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
