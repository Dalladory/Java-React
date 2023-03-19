import * as Yup from "yup";

export const CreateCategorySchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(3, "Too short"),
  description: Yup.string()
    .required("Description is required")
    .min(3, "Too short"),
});

export const CreateProductSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(3, "Too short"),
  description: Yup.string()
    .required("Description is required")
    .min(3, "Too short"),
});
