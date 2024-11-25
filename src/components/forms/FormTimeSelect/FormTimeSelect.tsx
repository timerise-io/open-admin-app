import React from "react";
import { Typography } from "components/Typography";
import { ContextSelectWithInput } from "components/forms/FormTimeSelect/ContextSelectWithInput";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { useField } from "formik";

let options: Record<string, string> = new Array(24)
  .fill(0)
  .map((_, index) => {
    return index;
  })
  .reduce((acc, item) => {
    return {
      ...acc,
      [`${item}:00`]: `${item}:00`,
      [`${item}:30`]: `${item}:30`,
    };
  }, {});
options["24:00"] = "24:00";

interface FormTimeSelectProps {
  label?: string;
  name: string;
  hideErrors?: boolean;
  disabled?: boolean;
}

const FormTimeSelect = ({ label, name, hideErrors = false, disabled = false }: FormTimeSelectProps) => {
  const [, meta, helpers] = useField({ name });
  return (
    <Column ai="stretch" w="100%">
      <ContextSelectWithInput
        label={label ?? ""}
        value={meta.value}
        options={options}
        onChange={(value) => {
          helpers.setTouched(true);
          helpers.setValue(value.replace(/^0?$/, ""));
        }}
        disabled={disabled}
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
    </Column>
  );
};

export default FormTimeSelect;
