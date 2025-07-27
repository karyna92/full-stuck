import React from "react";
import AddProductForm from "../components/Products/addProduct";
import { createProduct } from "../api/productApi";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const navigate = useNavigate();

  const handleAddProduct = async (newProduct) => {
    console.log(newProduct)
    try {
      const created = await createProduct(newProduct);
      console.log("Product added:", created);
      navigate("/");
    } catch (error) {
      console.error("Failed to add product", error);
    }
  };

  return (
    <div>
      <AddProductForm onSubmit={handleAddProduct} />
    </div>
  );
};

export default AddProductPage;
