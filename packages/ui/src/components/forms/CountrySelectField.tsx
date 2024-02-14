import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Grid,
  MenuItem,
  Select,
  Typography,
  FormHelperText as MuiFormHelperText,
  FormHelperTextProps as MuiFormHelperTextProps,
  InputLabelProps,
  InputLabel as MuiInputLabel,
  Box,
  Stack,
  OutlinedInputProps,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  ControllerProps,
} from "react-hook-form";
import { COUNTRY_LIST, countryByCode } from "../../constants/contants";
import { red } from "@mui/material/colors";
import { ErrorFieldIcon, InputLoader } from ".";

interface Props<T extends FieldValues>
  extends Omit<OutlinedInputProps, "notched">,
    Pick<FormHelperTextProps, "showErrorIcon">,
    Pick<ControllerProps<T>, "shouldUnregister"> {
  name: Path<T>;
  control: Control<T, object>;
  isLoading?: boolean;
  label?: string | JSX.Element;
  optional?: boolean;
  displayEmpty?: boolean;
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

export const CountrySelectField = <T extends FieldValues>({
  name,
  control,
  isLoading,
  label,
  optional,
  displayEmpty,
  required,
  ...props
}: Props<T>) => {
  const codeFromForm = control._getWatch(name);
  const [code, setCode] = useState<string>(codeFromForm);

  useEffect(() => {
    codeFromForm !== code && setCode(control._getWatch(name));
  }, [codeFromForm]);

  if (isLoading) {
    return <InputLoader />;
  }

  const country = countryByCode(code);

  return (
    <Grid container spacing={2}>
      <Controller
        name={name}
        control={control}
        render={({
          field: { name, onChange, value, ref },
          fieldState: { error },
          ...controllerProps
        }) => (
          <Grid item xs={12} container wrap="nowrap">
            <Grid item container direction="column">
              {label && (
                <InputLabel
                  error={Boolean(error?.message)}
                  required={required}
                ></InputLabel>
              )}
            </Grid>
            <Grid item container flexWrap="nowrap">
              <Grid item flex={1}>
                <Select
                  {...props}
                  {...controllerProps}
                  key={code}
                  fullWidth
                  id={name}
                  inputRef={ref}
                  data-testid={name}
                  inputProps={{ shrink: "false" }}
                  color="primary"
                  IconComponent={KeyboardArrowDown}
                  onChange={(e) => {
                    onChange(e.target.value);
                    setCode(e.target.value);
                  }}
                  value={code}
                  defaultValue={code}
                  displayEmpty={displayEmpty}
                >
                  {optional && (
                    <MenuItem value="">
                      <Typography sx={{ height: "26px" }} />
                    </MenuItem>
                  )}
                  {COUNTRY_LIST.map((country) => (
                    <MenuItem
                      key={country.code}
                      value={country.code}
                      id={country.code}
                      data-testid={country.code}
                    >
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              {country && (
                <Grid
                  item
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  pl={4}
                >
                  <ReactCountryFlag
                    countryCode={value}
                    svg
                    style={{
                      width: "2em",
                      height: "2em",
                    }}
                    title={country}
                    alt={`${country} flag`}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        )}
      />
    </Grid>
  );
};
