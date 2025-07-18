import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetailsCard from "../components/Products/productDetails";
import ReviewsList from "../components/Reviews/ReviewsList";
import AddToCartModal from "../components/Cart/AddToCartModal";
import { getProductById } from "../api/productApi";
import { addItemToCart } from "../api/userApi";

const ProductPage = ({ user, setLoginModal }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [addToCartModal, setAddToCartModal] = useState(false);

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

  const handleAddToCart = () => {
    if (!user) {
      setLoginModal(true);
    } else {
      setAddToCartModal(true);
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      setLoginModal(true);
    } else {
      console.log("Thanks for your purchase!");
    }
  };

  const handleAddToCartSubmit = async (quantity) => {
    try {
      await addItemToCart(user._id, product._id, quantity);
      setAddToCartModal(false);
      alert("item was succesfuly added to cart");
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };
  

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <ProductDetailsCard product={product} />
      <ReviewsList reviews={product.reviews} />
      <div>
        <button onClick={handleAddToCart}>Add to Cart</button>
        <button onClick={handleBuyNow}>Buy Now</button>
      </div>
      {addToCartModal && (
        <AddToCartModal
          isOpen={addToCartModal}
          onClose={() => setAddToCartModal(false)}
          product={product}
          onSubmit={handleAddToCartSubmit}
        />
      )}
    </div>
  );
};

export default ProductPage;
