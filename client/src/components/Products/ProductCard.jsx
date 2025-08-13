import React from "react";
import { Link } from "react-router-dom";
import "./products.css";

const ProductCard = ({ product, user, handleDelete }) => {
  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`} className="product-card-link">
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
        <div className="product-info">
          <p>{product.description}</p>
          <p>
            <strong>Price:</strong> ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>

      {user?.role === "admin" && (
        <div className="admin-product-controls">
          <Link to={`/products/edit/${product._id}`}>
            <button className="edit-btn">✏️ Edit</button>
          </Link>
          <button onClick={handleDelete} className="delete-btn">
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;