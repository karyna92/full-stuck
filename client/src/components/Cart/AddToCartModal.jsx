import React from "react";
import Modal from "react-modal";; 
import { Formik, Form, Field, ErrorMessage } from "formik";
import {addToCartSchema} from "../../../schemas/CartItem";
import "./styles.css"

Modal.setAppElement("#root");

const AddToCartModal = ({ isOpen, onClose, onSubmit, product }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={`Add ${product.name} to Cart`}
      className="modal"
      overlayClassName="modal-overlay"
      shouldCloseOnOverlayClick={true}
    >
      <h2 className="modal-title">Add "{product.name}" to Cart</h2>

      <Formik
        initialValues={{ quantity: 1 }}
        validationSchema={addToCartSchema(product.stock)}
        onSubmit={(values) => {
          onSubmit(values.quantity);
        }}
      >
        {() => (
          <Form className="modal-form">
            <div className="form-group">
              <label htmlFor="quantity" className="form-label">
                Quantity:
              </label>
              <Field
                type="number"
                name="quantity"
                min="1"
                max={product.stock}
                className="form-input"
              />
              <ErrorMessage
                name="quantity"
                component="div"
                className="form-error"
              />
            </div>

            <div className="button-group">
              <button
                type="button"
                onClick={onClose}
                className="button button-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="button button-primary">
                Add to Cart
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddToCartModal;
