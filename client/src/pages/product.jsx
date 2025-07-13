import { useParams,  } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetailsCard from "../components/Products/productDetails";
import { getProductById, addProductToChart } from "../api/productApi";

const ProductPage = ({ user, setLoginModal }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      setLoginModal(true);
    } else {
      try {
        await addProductToChart(user._id, product._id, 1);
        console.log("Product added to cart!");
      } catch (error) {
        console.error("Failed to add to cart:", error);
      }
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      setLoginModal(true);
    } else {
      console.log("Thanks for your purchase!");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <ProductDetailsCard product={product} />

      {product.reviews?.length > 0 ? (
        <div>
          <h3>Reviews:</h3>
          <ul>
            {product.reviews.map((reviewId) => (
              <li key={reviewId}>{reviewId}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No reviews yet.</p>
      )}

      <div>
        <button onClick={handleAddToCart}>Add to Cart</button>
        <button onClick={handleBuyNow}>Buy Now</button>
      </div>
    </div>
  );
};

export default ProductPage;
