import * as yup from "yup";

export const productSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .max(70, "Title must not exceed 70 characters"),
  description: yup
    .string()
    .required("Description is required")
    .max(500, "Description must not exceed 500 characters"),
  price: yup.string().required("Price is required"),
});
