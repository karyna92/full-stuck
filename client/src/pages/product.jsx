import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetailsCard from "../components/Products/productDetails";
import ReviewsList from "../components/Reviews/ReviewsList";
import AddToCartModal from "../components/Cart/AddToCartModal";
import { getProductById } from "../api/productApi";
import { addItemToCart } from "../api/userApi";
// import "./ProductPage.css";

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
      alert("Thanks for your purchase!");
    }
  };

  const handleAddToCartSubmit = async (quantity) => {
    try {
      await addItemToCart(user._id, product._id, quantity);
      setAddToCartModal(false);
      alert("Item was successfully added to cart.");
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="product-page">
      <Link to="/" className="back-button">
        ← Back to Products
      </Link>

      <ProductDetailsCard product={product} />
      <ReviewsList reviews={product.reviews} />

      <div className="product-actions">
        <button className="btn add-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className="btn buy-now-btn" onClick={handleBuyNow}>
          Buy Now
        </button>
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
