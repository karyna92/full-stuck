import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EditProductForm from "../components/Products/editProduct";
import { fetchProductById, updateProduct } from "../store/slices/productSlice";

const EditProductPage = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.products.currentProduct);
  const loading = useSelector((state) => state.products.isLoading);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await dispatch(updateProduct({ id, updatedProduct })).unwrap();
      console.log("Product updated:", id, updatedProduct);
      navigate("/");
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <EditProductForm
      product={product}
      user={user}
      onSubmit={handleUpdateProduct}
    />
  );
};

export default EditProductPage;
