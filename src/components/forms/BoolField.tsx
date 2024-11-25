import React from "react";
import Checkbox from "components/Checkbox";
import { useField } from "formik";
import { useTranslation } from "react-i18next";

interface BoolFieldProps {
  label?: string;
  name: string;
}

const BoolField: React.FC<BoolFieldProps> = ({ label, name }) => {
  const { t } = useTranslation();
  const labelToDisplay = label === undefined ? t(`forms.${name}Field`) : label;

  const [field, , helpers] = useField({ name });

  return (
    <Checkbox
      label={labelToDisplay}
      value={!!field.value}
      onChange={(value) => {
        helpers.setValue(value);
      }}
    />
  );
};

export default BoolField;
