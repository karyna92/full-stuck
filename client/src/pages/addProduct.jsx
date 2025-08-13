import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AddProductForm from "../components/Products/addProduct";
import { createProduct } from "../store/slices/productSlice";
const AddProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddProduct = async (newProduct) => {
    console.log(newProduct)
    try {
      const created = await dispatch(createProduct(newProduct));
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
