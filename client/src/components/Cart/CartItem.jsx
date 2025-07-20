import React from "react";
import "./styles.css"; 

const CartListItem = ({ user, item, onRemove, onUpdateQuantity }) => {
  const { product, quantity } = item;

  if (!product) {
    return <div>Product not found or deleted</div>;
  }

  return (
    <div className="cart-list-item">
      <div className="item-details">
        <h4>{product.name}</h4>
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="cart-item-image"
          />
        )}
        <p>Price: ${product.price.toFixed(2)}</p>
        <p>Quantity: {quantity}</p>
        <p>Total: ${(product.price * quantity).toFixed(2)}</p>
      </div>

      <div className="item-actions">
        {onUpdateQuantity && (
          <div className="quantity-controls">
            <button
              onClick={() =>
                onUpdateQuantity(user._id, product._id, quantity + 1)
              }
            >
              +
            </button>
            <button
              onClick={() =>
                onUpdateQuantity(user._id, product._id, quantity - 1)
              }
              disabled={quantity <= 1}
            >
              -
            </button>
          </div>
        )}

        {onRemove && (
          <button
            className="remove-button"
            onClick={() => onRemove(product._id, user._id)}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default CartListItem;