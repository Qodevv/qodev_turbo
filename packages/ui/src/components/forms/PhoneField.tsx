import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Grid,
  MenuItem,
  OutlinedInputProps,
  Select,
  Typography,
  FormHelperText as MuiFormHelperText,
  FormHelperTextProps as MuiFormHelperTextProps,
  StackProps,
  InputLabelProps,
  InputLabel as MuiInputLabel,
  Box,
  Stack,
} from "@mui/material";
import React, { FocusEvent, useMemo, useState } from "react";
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldPathValue,
  FieldValues,
  Path,
  UnpackNestedValue,
} from "react-hook-form";
import NumberFormat from "react-number-format";
import { Input } from "./Input";
import { InputLoader } from "./InputLoader";
import {
  DEFAULT_PHONE_COUNTRY_CODE,
  PHONE_CODES,
} from "../../constants/contants";
import { red } from "@mui/material/colors";
import { ErrorFieldIcon } from "./ErrorFieldIcon";

interface Props<T extends FieldValues>
  extends Omit<OutlinedInputProps, "notched">,
    Pick<FormHelperTextProps, "showErrorIcon">,
    Pick<ControllerProps<T>, "shouldUnregister"> {
  name: Path<T>;
  control: Control<T>;
  defaultValue?: UnpackNestedValue<FieldPathValue<T, FieldPath<T>>>;
  label?: string | JSX.Element;
  color?: OutlinedInputProps["color"];
  type?: OutlinedInputProps["type"];
  startAdornment?: OutlinedInputProps["startAdornment"];
  placeholder?: OutlinedInputProps["placeholder"];
  countryCode: string;
  isLoading?: boolean;
  onCountryCodeChanged(code: string): void;
  helperText?: string;
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

export const PhoneField = <T extends FieldValues>({
  name,
  control,
  ...props
}: Props<T>) => (
  <Controller<T>
    name={name}
    control={control}
    render={({ formState: _, ...controllerProps }) => (
      <PhoneFieldComponent {...controllerProps} {...props} />
    )}
  />
);

interface ComponentProps<T extends FieldValues>
  extends Omit<Props<T>, "name" | "control" | "defaultValue"> {
  field: ControllerRenderProps<T, Path<T>>;
  fieldState?: ControllerFieldState;
  defaultValue?: number;
}

const PhoneFieldComponent = <T extends object>({
  label,
  field: rawField,
  isLoading,
  countryCode,
  onCountryCodeChanged,
  placeholder,
  defaultValue,
  labelProps,
  error,
  helperText,
  required,
  showErrorIcon,
}: ComponentProps<T>) => {
  const field = { ...rawField, inputRef: rawField?.ref, ref: undefined };
  const phoneCodes = useMemo(
    () => [
      PHONE_CODES.find((pc) => pc.code === DEFAULT_PHONE_COUNTRY_CODE)!,
      ...PHONE_CODES.filter(
        (pc) => pc.code !== DEFAULT_PHONE_COUNTRY_CODE
      ).sort((a, b) => a.code.localeCompare(b.code)),
    ],
    []
  );

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        {label && (
          <InputLabel error={error} required={required} {...labelProps}>
            {label}
          </InputLabel>
        )}
      </Grid>
      <Grid item>
        {isLoading ? (
          <InputLoader />
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={5}>
              <Select
                data-testid="phone-code-select"
                fullWidth
                inputProps={{ shrink: "false" }}
                MenuProps={{ sx: { maxHeight: "300px", width: "100%" } }}
                color="primary"
                IconComponent={KeyboardArrowDown}
                onChange={({ target }) => onCountryCodeChanged(target.value)}
                value={countryCode}
              >
                {phoneCodes.map((pc) => (
                  <MenuItem key={pc.code} value={pc.code}>
                    {`${pc.dial_code} (${pc.code})`}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={7}>
              <NumberFormat
                data-testid="phone-field"
                customInput={Input}
                name={field.name}
                onChange={field.onChange}
                defaultValue={defaultValue}
                placeholder={placeholder}
                value={field.value as string}
                decimalSeparator="."
                displayType="input"
                type="text"
                thousandSeparator={false}
                allowNegative={true}
                isNumericString={true}
                decimalScale={0}
                fixedDecimalScale={true}
              />
            </Grid>
          </Grid>
        )}
        {helperText && (
          <FormHelperText showErrorIcon={showErrorIcon} error={error}>
            {helperText}
          </FormHelperText>
        )}
      </Grid>
      {helperText && (
        <FormHelperText showErrorIcon={showErrorIcon} error={error}>
          {helperText}
        </FormHelperText>
      )}
    </Grid>
  );
};
