import React from "react";
import ProductCard from "./ProductCard";
import "./products.css";

const ProductsList = ({ products }) => {
  return (
    <ul className="products-list">
      {products.map((product) => (
        <li key={product._id} className="product-item">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};

export default ProductsList;
