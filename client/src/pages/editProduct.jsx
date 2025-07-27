import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../api/productApi";
import EditProductForm from "../components/Products/editProduct";

const EditProductPage = ({user} ) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await getProductById(id);
        setProduct(result);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdateProduct = async (productId, updatedProduct) => {
    try {
      await updateProduct(productId, updatedProduct);
          console.log("Updating product:", productId, updatedProduct); 
      navigate("/");
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  if (!product) return <div>Loading...</div>; 

  return <EditProductForm product={product} user={user} onSubmit={handleUpdateProduct} />;
};

export default EditProductPage;
