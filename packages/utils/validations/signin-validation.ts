import * as yup from "yup";

export const loginFormSchema = yup.object({
  username: yup.string().required("username is required").max(80).default(""),
  password: yup.string().required("password is required").max(128).default(""),
});

export type LoginForm = yup.InferType<typeof loginFormSchema>;
