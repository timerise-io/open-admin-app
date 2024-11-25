import React from "react";
import { Typography } from "components/Typography";
import { ContextSelect } from "components/card/components/ContextSelect";
import { Box } from "components/layout/Box";
import { useField } from "formik";

interface FormSelectProps {
  label?: string;
  name: string;
  options: Record<string, string>;
  hideErrors?: boolean;
  disabled?: boolean;
  additionalOptions?: Record<string, string>;
  ctx?: string;
  handleChange?: Function;
  value?: string;
  separators?: Array<string>;
  placeholder?: string;
  withSearch?: boolean;
  withAddOption?: boolean;
}

const FormSelect = ({
  label,
  name,
  options,
  hideErrors = false,
  disabled = false,
  additionalOptions = {},
  ctx = "",
  handleChange,
  value,
  separators = [],
  placeholder,
  withSearch = false,
  withAddOption = false,
}: FormSelectProps) => {
  const [, meta, helpers] = useField({ name });

  return (
    <>
      <ContextSelect
        label={label ?? ""}
        value={value ?? meta.value}
        options={{ ...additionalOptions, ...options }}
        onChange={(value) => {
          helpers.setTouched(true);
          helpers.setValue(value);
          handleChange && handleChange(value);
        }}
        disabled={disabled}
        ctx={ctx}
        separators={separators}
        placeholder={placeholder}
        withSearch={withSearch}
        withAddOption={withAddOption}
      />
      {hideErrors === false && (
        <Box h="13px" mt={0.5} mb={1}>
          {meta.error && meta.touched && (
            <Typography typographyType="label" as="span" color="error">
              {meta.error}
            </Typography>
          )}
        </Box>
      )}
    </>
  );
};

export default FormSelect;
