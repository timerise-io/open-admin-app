import React from "react";
import { Typography } from "components/Typography";
import { DatePicker } from "components/card/components/DatePicker";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { useField } from "formik";
import { useTranslation } from "react-i18next";

interface FormDataPickerProps {
  label?: string;
  name: string;
  disabled?: boolean;
}

const FormDataPicker = ({ label, name, disabled = false }: FormDataPickerProps) => {
  const { t } = useTranslation();
  const labelToDisplay = label === undefined ? t(`forms.${name}Field`) : label;

  const [, meta, helpers] = useField({ name });
  const { value } = meta;
  const { setValue, setTouched } = helpers;

  return (
    <Column ai="stretch" w="100%">
      <DatePicker
        label={labelToDisplay}
        value={value}
        onChange={(newValue: Date) => {
          setTouched(true);
          setValue(newValue);
        }}
        disabled={disabled}
      />
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

export default FormDataPicker;
