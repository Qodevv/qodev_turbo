import {
  Grid,
  OutlinedInputProps,
  Typography,
  FormHelperText as MuiFormHelperText,
  FormHelperTextProps as MuiFormHelperTextProps,
  StackProps,
  InputLabelProps,
  InputLabel as MuiInputLabel,
  Box,
  Stack,
} from "@mui/material";
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldPathValue,
  FieldValues,
  Path,
  UnpackNestedValue,
  ControllerProps,
} from "react-hook-form";
import { Input } from "./Input";
import { InputLoader } from "./InputLoader";
import React from "react";
import { red } from "@mui/material/colors";
import { ErrorFieldIcon } from "./ErrorFieldIcon";

interface Props<T extends object>
  extends Omit<OutlinedInputProps, "notched">,
    Pick<FormHelperTextProps, "showErrorIcon">,
    Pick<ControllerProps<T>, "shouldUnregister"> {
  name: Path<T>;
  control: Control<T>;
  defaultValue?: UnpackNestedValue<FieldPathValue<T, FieldPath<T>>>;
  label?: string | JSX.Element | null;
  color?: OutlinedInputProps["color"];
  type?: OutlinedInputProps["type"];
  startAdornment?: OutlinedInputProps["startAdornment"];
  placeholder?: OutlinedInputProps["placeholder"];
  isLoading?: boolean;
  "data-testid"?: string;
  onEnter?(): void;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  helperText?: string;
  containerProps?: StackProps;
  labelProps?: InputLabelProps;
}

type FormHelperTextProps = MuiFormHelperTextProps & {
  error?: boolean;
  showErrorIcon?: boolean;
};

export const InputLabel: React.FC<InputLabelProps> = ({
  children,
  required,
  ...rest
}) => {
  return (
    <MuiInputLabel {...rest}>
      <Box sx={{ display: "flex" }}>
        {required && <Box sx={{ color: red[500], mr: 0.5 }}>*</Box>}
        {children}
      </Box>
    </MuiInputLabel>
  );
};

export const FormHelperText: React.FC<FormHelperTextProps> = ({
  children,
  error,
  sx = {},
  ...rest
}) => {
  return (
    <Stack
      direction="row"
      gap={1}
      alignItems="flex-start"
      justifyContent="flex-start"
    >
      {error && (
        <Box>
          <ErrorFieldIcon />
        </Box>
      )}
      <MuiFormHelperText sx={{ mt: 0, ...sx }} error={error} {...rest}>
        {children}
      </MuiFormHelperText>
    </Stack>
  );
};

export const TextField = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  shouldUnregister,
  ...props
}: Props<T>) => (
  <Controller<T>
    name={name}
    control={control}
    shouldUnregister={shouldUnregister}
    defaultValue={defaultValue}
    render={({
      formState: _,
      fieldState: { error },
      field: { onChange, value },
      ...controllerProps
    }) => (
      <TextFieldComponent
        helperText={error?.message}
        onChange={onChange}
        value={value}
        error={Boolean(error?.message)}
        {...controllerProps}
        {...props}
      />
    )}
  />
);

interface ComponentProps<T extends object>
  extends Omit<Props<T>, "name" | "control" | "defaultValue"> {
  field?: ControllerRenderProps<T, Path<T>>;
  fieldState?: ControllerFieldState;
}

export const TextFieldComponent = <T extends object>({
  label,
  field: rawField,
  fieldState,
  onEnter,
  isLoading,
  containerProps,
  sx = {},
  disabled,
  labelProps,
  error,
  helperText,
  required,
  showErrorIcon,
  multiline,
  id,
  rows,
  type,
  ...props
}: ComponentProps<T>) => {
  return (
    <Stack gap={1} {...containerProps}>
      {label && (
        <InputLabel error={error} required={required} {...labelProps}>
          {label}
        </InputLabel>
      )}
      {isLoading ? (
        <InputLoader />
      ) : (
        <Input
          error={error}
          disabled={disabled}
          sx={{
            backgroundColor: (theme) =>
              disabled ? theme.palette.grey[200] : "inherit",
            ...sx,
          }}
          multiline={multiline}
          id={id}
          rows={rows}
          type={type}
          {...props}
        />
      )}
      {helperText && (
        <FormHelperText showErrorIcon={showErrorIcon} error={error}>
          {helperText}
        </FormHelperText>
      )}
    </Stack>
  );
};
