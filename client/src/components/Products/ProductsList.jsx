import React from "react";
import ProductCard from "./ProductCard";

const ProductsList = ({ products }) => {
  return (
    <ul>
      {products.map((product) => (
        <li key={product._id} style={{ margin: "8px" }}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};

export default ProductsList;
