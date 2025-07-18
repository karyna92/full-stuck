import CartItem from "./CartItem";
import { deleteItemFromCart, addItemToCart } from "../../api/userApi";


const CartList = ({user}) => {
  console.log(user)
  if (!user.cart || user.cart.length === 0) {
    return null
  }

 const onUpdateItem = async (productId, newQuantity) => {
   await addItemToCart(user._id, productId, newQuantity);
   window.location.reload(); 
 };

const onRemoveItem = async (productId) => {
  await deleteItemFromCart(user._id, productId);
  window.location.reload();
};

 const total = user.cart.reduce((acc, item) => {
   if (!item.product) return acc; 
   return acc + item.product.price * item.quantity;
 }, 0);

  return (
    <div className="cart-list">
      <h2>Your Cart</h2>
      <ul>
        {user.cart.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            user ={user}
            onRemove={onRemoveItem}
            onUpdateQuantity={onUpdateItem}
          />
        ))}
      </ul>

      <p>your total: {total}</p>
    </div>
  );
};
export default CartList;