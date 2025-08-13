import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import OrderPlacementModal from "../Orders/OrderPlacementModal";
import {
 addOrUpdateProduct,
  removeProduct 
} from "../../store/slices/cartSlice";
import { toggleOrderModal } from "../../store/slices/modalSlice";
import { addOrder } from "../../store/slices/orderSlice";

const CartList = ({ user }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);
  const orderModal = useSelector((state) => state.modal.orderModal); 

  const [selectedItemIds, setSelectedItemIds] = useState([]);

  const toggleSelectItem = (itemId) => {
    setSelectedItemIds((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const onUpdateItem = (productId, newQuantity) => {
    dispatch(addOrUpdateProduct({ productId, quantity: newQuantity }));
  };

  const onRemoveItem = (productId) => {
    dispatch(removeProduct({ productId }));
    setSelectedItemIds((prev) => prev.filter((id) => id !== productId));
  };

  const onPlaceOrder = (orderData) => {
    const selectedItems = cart.filter((item) =>
      selectedItemIds.includes(item._id)
    );

    if (selectedItems.length === 0) return;

    const total = selectedItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    const fullOrderData = {
      total,
      products: selectedItems.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      })),
      ...orderData,
    };

    dispatch(addOrder({ orderData: fullOrderData }))
      .unwrap()
      .then(() => {
        // Optionally refresh cart or clear selected items here
        setSelectedItemIds([]);
        dispatch(toggleOrderModal(false));
      })
      .catch((error) => {
        console.error("Order placement failed:", error);
      });
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
        onClick={() => dispatch(toggleOrderModal(true))}
        disabled={selectedItemIds.length === 0}
      >
        Place Order
      </button>

      <OrderPlacementModal
        user={user}
        isOpen={orderModal}
        onClose={() => dispatch(toggleOrderModal(false))}
        onSubmit={onPlaceOrder}
      /> 
    </div>
  );
};

export default CartList;
