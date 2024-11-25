import React from "react";
import StyledInput from "components/StyledInput";
import StyledLabel from "components/StyledLabel";
import { Typography } from "components/Typography";
import { ContextSelect } from "components/card/components/ContextSelect";
import { Box } from "components/layout/Box";
import { emailPattern, urlPattern } from "helpers/regExPatterns";
import styled from "styled-components";

const options: Record<string, string> = {
  [emailPattern]: "Email",
  [urlPattern]: "URL",
  Custom: "Custom",
};

const getSelectedValue = (pattern: string) => {
  return [emailPattern, urlPattern].includes(pattern) ? pattern : "Custom";
};

const FormFieldLabel = styled(StyledLabel)`
  margin-top: 20px;
`;

const FormFieldInput = styled(StyledInput)`
  width: -webkit-fill-available;
`;

const AdditionalInfo = styled(Typography)`
  margin: 4px 0;
  & > .learn-more {
    all: unset;
    color: inherit;
    cursor: pointer;
    text-decoration: underline;
  }
`;

interface ValidationRegexInputProps {
  validationRegex: string;
  onValidationChange: (value: string) => void;
}

const ValidationRegexInput = ({ validationRegex, onValidationChange }: ValidationRegexInputProps) => {
  const value = getSelectedValue(validationRegex);

  return (
    <Box mt={2.25}>
      <ContextSelect
        label="Field type"
        options={options}
        value={value}
        onChange={(newValue) => {
          if (typeof newValue !== "string") return;
          onValidationChange(newValue === "Custom" ? "" : newValue);
        }}
      />
      <Box mt={2} mb={0.5}>
        <FormFieldLabel>Validation pattern</FormFieldLabel>
      </Box>
      <FormFieldInput
        value={validationRegex ?? ""}
        onChange={(event) => {
          onValidationChange(event.target.value);
        }}
        disabled={value !== "Custom"}
      />
      <AdditionalInfo typographyType="label">
        The validation pattern contains JS regular expression, which will be used to ensure that a user has entered the
        correct data.{" "}
        <a href="https://www.w3schools.com/jsref/jsref_obj_regexp.asp" target="blank" className="learn-more">
          Learn more
        </a>
      </AdditionalInfo>
    </Box>
  );
};

export default ValidationRegexInput;
