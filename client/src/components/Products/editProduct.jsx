import React from "react";
import { useFormik } from "formik";
import { productValidationSchema } from "../../../schemas/products";

const EditProductForm = ({ product, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      image: product?.image || "",
      category: product?.category || "",
      stock: product?.stock || 0,
      discount: product?.discount || 0,
    },
    enableReinitialize: true,
    validationSchema: productValidationSchema,
    onSubmit: (values) => {
      onSubmit(product._id, values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="edit-product-form">
      <h2>Edit Product</h2>

      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      {formik.touched.name && formik.errors.name && (
        <div className="error">{formik.errors.name}</div>
      )}

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        onChange={formik.handleChange}
        value={formik.values.description}
      />
      {formik.touched.description && formik.errors.description && (
        <div className="error">{formik.errors.description}</div>
      )}

      <label htmlFor="price">Price</label>
      <input
        id="price"
        name="price"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.price}
      />
      {formik.touched.price && formik.errors.price && (
        <div className="error">{formik.errors.price}</div>
      )}

      <label htmlFor="image">Image URL</label>
      <input
        id="image"
        name="image"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.image}
      />
      {formik.touched.image && formik.errors.image && (
        <div className="error">{formik.errors.image}</div>
      )}

      <label htmlFor="category">Category</label>
      <input
        id="category"
        name="category"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.category}
      />
      {formik.touched.category && formik.errors.category && (
        <div className="error">{formik.errors.category}</div>
      )}

      <label htmlFor="stock">Stock</label>
      <input
        id="stock"
        name="stock"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.stock}
      />
      {formik.touched.stock && formik.errors.stock && (
        <div className="error">{formik.errors.stock}</div>
      )}

      <label htmlFor="discount">Discount (%)</label>
      <input
        id="discount"
        name="discount"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.discount}
      />
      {formik.touched.discount && formik.errors.discount && (
        <div className="error">{formik.errors.discount}</div>
      )}

      <button type="submit" className="save-btn">
        💾 Save Changes
      </button>
    </form>
  );
};

export default EditProductForm;
