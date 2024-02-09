import { useCmsElementsContext } from "@repo/utils/context";
import React from "react";
import {
  LoginForm as LoginFormType,
  loginFormSchema,
} from "@repo/utils/validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@repo/ui";

interface Props {
  onSubmit: (values: LoginFormType) => void;
  submitLoading: boolean;
}

export const LoginForm: React.FC<Props> = ({ onSubmit, submitLoading }) => {
  const { labelByKey, buttonByKey } = useCmsElementsContext();
  const { handleSubmit, control } = useForm<LoginFormType>({
    resolver: yupResolver(loginFormSchema),
    mode: "onChange",
    defaultValues: loginFormSchema.getDefault(),
  });
  const btnLogin = buttonByKey("button_signin");
  return (
    <form data-testid="authentication_form" id="login-form" name="login-form">
      <div className="mb-4">
        <div className="relative">
          <TextField<LoginFormType>
            data-testid="auth-username"
            name={"username"}
            control={control}
            label={labelByKey("username_field")}
            required
            shouldUnregister
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <TextField<LoginFormType>
            data-testid="auth-password"
            name={"password"}
            control={control}
            label={labelByKey("password_field")}
            required
            shouldUnregister
            type="password"
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center"></div>

        <div className="text-sm">{/* Forgot password link */}</div>
      </div>
      <div className="mb-5">
        <button
          data-testid="auth-submit-button"
          onClick={handleSubmit(onSubmit)}
          id="login-button"
          name="login-button"
          className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
        >
          {btnLogin.text}
        </button>
      </div>
    </form>
  );
};
