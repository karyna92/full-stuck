// src/validation/productValidationSchema.js
import * as Yup from "yup";

export const productValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be 0 or more"),
  description: Yup.string().required("Description is required"),
  image: Yup.string().url("Image must be a valid URL").nullable(),
  category: Yup.string().required("Category is required"),
  stock: Yup.number()
    .required("Stock is required")
    .min(0, "Stock must be 0 or more"),
  discount: Yup.number()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100")
    .default(0),
  media: Yup.array()
    .of(Yup.string().url("Each media entry must be a valid URL"))
    .nullable(),
});
