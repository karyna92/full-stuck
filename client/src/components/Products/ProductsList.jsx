import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import Sorter from "../Filterer/Sorter";
import ProductSearch from "../Filterer/Search";
import {deleteProduct} from "../../api/productApi";
import "./products.css";

const ProductsList = ({ products, user }) => {
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

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

  const handleAddProduct = () => {
    navigate("/products/new");
    console.log("Add Product Clicked");
  };

const handleDelete = async (productId) => {
  if (window.confirm("Are you sure you want to delete this product?")) {
    try {
      await deleteProduct(productId);
      console.log("Deleted product:", productId);
     navigate("/")
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  }
};

const handleUpdateproduct = (product) => {
  console.log("Update Product Clicked");
  navigate(`/products/${product.id}/edit`);
  };

  return (
    <div>
      <ProductSearch onSearch={setSearchTerm} />
      <Sorter sortBy={sortBy} setSortBy={setSortBy} />

      {user?.role === "admin" && (
        <button onClick={handleAddProduct} className="add-product-btn">
          ➕ Add Product
        </button>
      )}

      <ul className="products-list">
        {filteredAndSortedProducts.map((product) => (
          <li key={product._id} className="product-item">
            <ProductCard
              product={product}
              user={user}
              handleDelete={() => handleDelete(product._id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;