import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById, addProductToChart } from "../api/productApi";
import "./styles.css";

const ProductDetails = (props) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

 
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
    if (!props.user) {
      navigate("/user"); 
    } else {
      try {
        await addProductToChart(props.user._id, product._id, 1);
        console.log("Product added to cart!");
      } catch (error) {
        console.error("Failed to add to cart:", error);
      }
    }
  };


  const handleBuyNow = () => {
    if (!props.user) {
      navigate("/user");
    } else {
      console.log("Thanks for your purchase!");
    
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <h1>{product.name}</h1>

      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="product-details-image"
        />
      )}

      <p>
        <strong>Price:</strong> ${product.price.toFixed(2)}
      </p>

      {product.discount > 0 && (
        <p>
          <strong>Discount:</strong> {product.discount}%
        </p>
      )}

      <p>
        <strong>Description:</strong> {product.description}
      </p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>In Stock:</strong> {product.stock}
      </p>

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

export default ProductDetails;
