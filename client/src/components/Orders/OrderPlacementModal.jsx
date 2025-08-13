import React, { useState, useEffect } from "react";

const OrderPlacementModal = ({ user, isOpen, onClose, onSubmit }) => {

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
 
  useEffect(() => {
    if (isOpen && user?.address) {
      setDeliveryAddress(user.address);
    }
  }, [isOpen, user?.address]);

  const handleSubmit = () => {
    if (!deliveryAddress.trim()) {
      alert("Please enter delivery address.");
      return;
    }
    (
      onSubmit({
        deliveryAddress,
        note,
        paymentMethod,
        userId: user?.id,
      })
    );

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Place Your Order</h2>

        <label>Delivery Address:</label>
        <input
          type="text"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
        />

        <label>Note (optional):</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Any special requests?"
        />

        <label>Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="cash">Cash</option>
        </select>

        <div className="modal-buttons">
          <button onClick={handleSubmit} className="submit-btn">
            Confirm Order
          </button>
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPlacementModal;
