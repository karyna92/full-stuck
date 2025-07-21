import React, { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import Sorter from "../Filterer/Sorter";
import ProductSearch from "../Filterer/Search";
import "./products.css";

const ProductsList = ({ products }) => {
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

 
    if (searchTerm.trim() !== "") {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [products, searchTerm, sortBy]);

  return (
    <div>
      <ProductSearch onSearch={setSearchTerm} />

      <Sorter sortBy={sortBy} setSortBy={setSortBy} />

      <ul className="products-list">
        {filteredAndSortedProducts.map((product) => (
          <li key={product._id} className="product-item">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
