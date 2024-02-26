import { CheckboxProps, FormControlLabel } from "@mui/material";
import { ForwardedRef, forwardRef } from "react";
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldPath,
  FieldPathValue,
  FieldValues,
  Path,
  UnpackNestedValue,
} from "react-hook-form";
import { Checkbox } from "./Checkbox";

interface Props<T extends object> {
  name: Path<T>;
  control: Control<T>;
  defaultValue?: UnpackNestedValue<FieldPathValue<T, FieldPath<T>>>;
  label?: string | JSX.Element;
  disabled?: boolean;
  onValueChange?(checked: boolean): void;
}

type ComponentProps<T extends object> = Pick<
  CheckboxProps,
  "checked" | "disabled" | "color" | "inputProps"
> &
  Omit<ControllerRenderProps<T, Path<T>>, "onChange"> & {
    label?: string | JSX.Element;
    onChange(checked: boolean): void;
    onValueChange?(checked: boolean): void;
  };

export const CheckboxField = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  label,
  disabled,
  onValueChange,
}: Props<T>) => (
  <Controller<T>
    name={name}
    control={control}
    defaultValue={defaultValue}
    render={({ field }) => (
      <CheckboxComponent<T>
        label={label}
        disabled={disabled}
        onValueChange={onValueChange}
        checked={field.value}
        {...field}
      />
    )}
  />
);

const CheckboxComponent = forwardRef(function Component<T extends object>(
  {
    label,
    onChange,
    onValueChange,
    value,
    ...props
  }: Omit<ComponentProps<T>, "ref">,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <FormControlLabel
      label={label}
      sx={{
        "& #html-container > *": { marginBlockEnd: 0 },
        marginRight: { xs: 0, md: 4 },
        ".MuiCheckbox-root": { margin: { xs: 0, md: 4 } },
      }}
      control={
        <Checkbox
          {...props}
          value={!!value}
          ref={ref}
          onChange={handleChange}
        />
      }
    />
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onValueChange?.(event.target.checked);
    onChange(event.target.checked);
  }
});
