import CartItem from "./CartItem";
import { deleteItemFromCart, addItemtToCart } from "../../api/userApi";


const CartList = ({user}) => {
  console.log(user)
  if (!user.cart || user.cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  const onUpdateItem= (userId, productId) => { 
    addItemtToCart(userId, productId);

  };

const onRemoveItem = (userId, productId) => { 
   deleteItemFromCart(userId, productId)
  return <p>Item removed from cart</p>

}
  const total = user.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (
    <div className="cart-list">
      <h2>Your Cart</h2>
      <ul>
        {user.cart.map((item) => (
          <CartItem
            key={item.product._id}
            item={item}
            onRemove={onRemoveItem}
            onUpdate={onUpdateItem}
          />
        ))}
      </ul>

      <p>your total: {total}</p>
    </div>
  );
};
export default CartList;