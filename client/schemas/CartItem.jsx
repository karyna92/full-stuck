import * as Yup from "yup";

export const addToCartSchema = (maxStock) =>
  Yup.object({
    quantity: Yup.number()
      .min(1, "Quantity must be at least 1")
      .max(maxStock, `Max available: ${maxStock}`)
      .required("Quantity is required"),
  });
