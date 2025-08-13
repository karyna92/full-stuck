import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProductDetailsCard from "../components/Products/productDetails";
import ReviewsList from "../components/Reviews/ReviewsList";
import SimilarProducts from "../components/Filterer/SimilarProducts";
import AddToCartModal from "../components/Cart/AddToCartModal";
import AddReview from "../components/Reviews/AddReview";
import {
  fetchProductById,
  selectSimilarProducts,
} from "../store/slices/productSlice";
import { fetchReviews, createReview } from "../store/slices/reviewSlice";
import { addOrUpdateProduct } from "../store/slices/cartSlice";
import { toggleCartModal } from "../store/slices/modalSlice";

const ProductPage = ({ user, setLoginModal }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.products.currentProduct);
  console.log("Product from redux state:", product);
  const cartModal = useSelector((state) => state.modal);
  const similarProductsArray = useSelector(selectSimilarProducts);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id))
        .unwrap()
        .then((payload) => console.log("Thunk payload:", payload))
        .catch((err) => console.error(err));
    }
  }, [dispatch, id]);

  const handleBuyNow = () => {
    if (!user) {
      setLoginModal(true);
    } else {
      alert("Thanks for your purchase!");
    }
  };

  const handleAddToCartSubmit = (quantity) => {
    dispatch(addOrUpdateProduct({ productId: product._id, quantity }))
      .unwrap()
      .then(() => {
        toggleCartModal();
        alert("Item successfully added to cart.");
      })
      .catch((error) => {
        console.error("Failed to add to cart:", error);
        alert("Failed to add item to cart.");
      });
  };

  const submitReview = (reviewData) => {
    if (!user) {
      setLoginModal(true);
      return;
    }

    dispatch(createReview({ productId: product._id, reviewData }))
      .unwrap()
      .then(() => {
        alert("Review submitted successfully!");
        dispatch(fetchProductById(id));
      })
      .catch((error) => {
        console.error("Failed to submit review:", error);
        alert("Failed to submit review.");
      });
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
        <button
          className="btn add-cart-btn"
          onClick={() => dispatch(toggleCartModal())}
        >
          Add to Cart
        </button>
        <button className="btn buy-now-btn" onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>

      <SimilarProducts products={similarProductsArray} />

      {cartModal && (
        <AddToCartModal
          isOpen={cartModal}
          onClose={() => dispatch(toggleCartModal())}
          product={product}
          onSubmit={handleAddToCartSubmit}
        />
      )}
    </div>
  );
};

export default ProductPage;
