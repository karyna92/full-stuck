import { useState } from "react";
import CartItem from "./CartItem";
import {
  deleteItemFromCart,
  addItemToCart,
  createOrder,
} from "../../api/userApi";
import OrderPlacementModal from "../Orders/OrderPlacementModal";

const CartList = ({ user }) => {
  const [cart, setCart] = useState(user.cart || []);
  const [orderModal, setOrderModal] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  const refreshCart = (updatedCart) => {
    setCart(updatedCart);
  };

  const toggleSelectItem = (itemId) => {
    setSelectedItemIds((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const onUpdateItem = async (productId, newQuantity) => {
    await addItemToCart(user._id, productId, newQuantity);
    const updatedCart = cart.map((item) =>
      item.product._id === productId ? { ...item, quantity: newQuantity } : item
    );
    refreshCart(updatedCart);
  };

  const onRemoveItem = async (productId) => {
    await deleteItemFromCart(user._id, productId);
    const updatedCart = cart.filter((item) => item.product._id !== productId);
    refreshCart(updatedCart);
    setSelectedItemIds((prev) => prev.filter((id) => id !== productId));
  };

  const onPlaceOrder = async (orderData) => {
    const selectedItems = cart.filter((item) =>
      selectedItemIds.includes(item._id)
    );

    const total = selectedItems.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    const fullOrderData = {
      total,
      products: selectedItems.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      })),
      ...orderData,
    };

      console.log("Order submitted:", fullOrderData);

    await createOrder(user._id, fullOrderData);

    refreshCart(cart.filter((item) => !selectedItemIds.includes(item._id)));
    setSelectedItemIds([]);
    setOrderModal(false);
  };

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  const selectedItemsTotal = cart
    .filter((item) => selectedItemIds.includes(item._id))
    .reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="cart-list">
      <h2>Your Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item._id}>
            <input
              type="checkbox"
              value={item._id}
              checked={selectedItemIds.includes(item._id)}
              onChange={() => toggleSelectItem(item._id)}
            />
            <CartItem
              item={item}
              user={user}
              onRemove={onRemoveItem}
              onUpdateQuantity={onUpdateItem}
            />
          </li>
        ))}
      </ul>

      <p>Selected items total: {selectedItemsTotal.toFixed(2)}</p>

      <button
        onClick={() => setOrderModal(true)}
        disabled={selectedItemIds.length === 0}
      >
        Place Order
      </button>

      <OrderPlacementModal
        user={user}
        isOpen={orderModal}
        onClose={() => setOrderModal(false)}
        onSubmit={onPlaceOrder}
      />
    </div>
  );
};

export default CartList;
