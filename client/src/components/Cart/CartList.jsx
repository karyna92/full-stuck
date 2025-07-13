import CartItem from "./CartItem";

const CartList = ({ cart, onRemove, onUpdateQuantity }) => {
  if (!cart || cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="cart-list">
      <h2>Your Cart</h2>
      <ul>
        {cart.map((item) => (
          <CartItem
            key={item.product._id}
            item={item}
            onRemove={onRemove}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </ul>
    </div>
  );
};
export default CartList;