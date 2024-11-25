import React, { ChangeEvent, InputHTMLAttributes } from "react";
import StyledInput from "components/StyledInput";
import StyledLabel from "components/StyledLabel";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { useField } from "formik";
import { useTranslation } from "react-i18next";

interface PriceFieldProps {
  label?: string;
  name: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  hideLabel?: boolean;
  disabled?: boolean;
}

const PriceField: React.FC<PriceFieldProps> = ({ label, name, inputProps, hideLabel = false, disabled = false }) => {
  const { t } = useTranslation();
  const labelToDisplay = label === undefined ? t(`forms.${name}Field`) : label;

  const [, meta, helpers] = useField({ name });
  const { value } = meta;
  const { setValue, setTouched } = helpers;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue === "") {
      setValue(0);
    }
    if (isNaN(+newValue) || isNaN(parseFloat(newValue))) return;

    const parts = newValue.split(".");

    if (parts.length > 1 && parts[1].length > 2) return;

    setValue(newValue.replace(/^0+/, ""));
  };

  const input = (
    <StyledInput
      id={name}
      value={value}
      onChange={handleChange}
      onBlur={() => {
        setTouched(true);
      }}
      isError={meta.error && meta.touched ? true : false}
      disabled={disabled}
    />
  );

  return (
    <Column ai="stretch" w="100%">
      {hideLabel === false && <StyledLabel htmlFor={name}>{labelToDisplay}</StyledLabel>}
      {input}
      <Box h="13px" mt={0.5} mb={1}>
        {meta.error && meta.touched && (
          <Typography typographyType="label" as="span" color="error">
            {meta.error}
          </Typography>
        )}
      </Box>
    </Column>
  );
};

export default PriceField;
