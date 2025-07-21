import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductDetailsCard from "../components/Products/productDetails";
import ReviewsList from "../components/Reviews/ReviewsList";
import SimilarProducts from "../components/Filterer/SimilarProducts";
import AddToCartModal from "../components/Cart/AddToCartModal";
import AddReview from "../components/Reviews/AddReview";
import { getProductById, createReview } from "../api/productApi";
import { addItemToCart } from "../api/userApi";

const ProductPage = ({ products, user, setLoginModal }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProductsArray, setSimilarProductsArray] = useState([]);
  const [addToCartModal, setAddToCartModal] = useState(false);

  // Fetch current product
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

  // Generate similar products when products or product updates
  useEffect(() => {
    if (!products.length || !product) return;

    const currentName = product.name.toLowerCase();
    const nameParts = currentName.split(" ").filter((word) => word.length > 2);

    let similar = products.filter((p) => {
      if (p._id === product._id) return false;
      const productName = p.name.toLowerCase();
      return nameParts.some((word) => productName.includes(word));
    });

    if (similar.length === 0) {
      similar = products
        .filter((p) => p._id !== product._id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
    }

    setSimilarProductsArray(similar);
  }, [products, product]);

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
      alert("Item successfully added to cart.");
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const submitReview = async (reviewData) => {
    try {
      await createReview(user._id, product._id, reviewData);
      alert("Review submitted successfully!");

      const updatedProduct = await getProductById(id);
      setProduct(updatedProduct);
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="product-page">
      <Link to="/" className="back-button">
        ← Back to Products
      </Link>

      <ProductDetailsCard product={product} />

      <div>
        <ReviewsList reviews={product.reviews} />
        <AddReview onSubmit={submitReview} />
      </div>

      <div className="product-actions">
        <button className="btn add-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className="btn buy-now-btn" onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>

      <SimilarProducts products={similarProductsArray} />

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
