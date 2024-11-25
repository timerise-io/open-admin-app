import React, { InputHTMLAttributes } from "react";
import StyledInput from "components/StyledInput";
import StyledLabel from "components/StyledLabel";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { toastAtom } from "features/toast/state/toastAtom";
import { useField } from "formik";
import { TypographyType } from "models/theme";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import styled, { css } from "styled-components";
import { ContextButton } from "../ContextButton";

const StyledTextArea = styled.textarea`
  all: unset;
  resize: vertical;
  border-width: 1px;
  border-style: solid;
  height: 76px;
  white-space: pre-line;
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    background-color: ${theme.colorSchemas.input.background};
    border-color: ${theme.colorSchemas.input.border};
    border-radius: ${theme.borderRadius};
    font-size: ${theme.typography.body.size};
    padding: calc(1.125 * ${theme.spacing}) calc(1.375 * ${theme.spacing});

    line-height: ${({ theme }) => theme.typography.body.lineHeight};
    &:hover {
      border-color: ${theme.colorSchemas.input.borderHover};
    }
    &:focus {
      border-color: ${theme.colors.primary};
    }
  `}
`;

const StyledFieldWrapper = styled.div<{ showCopyButton: boolean }>`
  display: flex;
  flex-direction: row;

  ${({ showCopyButton }) => {
    return css`
      input {
        flex: 1;
        margin-right: ${showCopyButton ? "8px" : "0"};
      }
    `;
  }}
`;

interface TextFieldProps {
  label?: string;
  name: string;
  multiline?: boolean;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  hideLabel?: boolean;
  hideErrors?: boolean;
  disabled?: boolean;
  showCopyButton?: boolean;
  ctx?: string;
  version?: TypographyType;
  placeholder?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  name,
  inputProps,
  multiline = false,
  hideLabel = false,
  disabled = false,
  hideErrors = false,
  showCopyButton = false,
  ctx = "",
  version = "label",
  placeholder,
}) => {
  const { t } = useTranslation();
  const labelToDisplay = label === undefined ? t(`forms.${name}Field`) : label;

  const [field, meta] = useField({ name });
  const [currentToast, setCurrentToast] = useRecoilState(toastAtom);

  const copyValue = () => {
    const value = field?.value ? String(field?.value) : "";
    navigator.clipboard.writeText(value);
    setCurrentToast([
      ...currentToast,
      {
        variant: "SUCCESS",
        type: "copied",
        date: new Date().getTime(),
      },
    ]);
  };

  const input = multiline ? (
    <StyledTextArea id={name} rows={2} {...field} />
  ) : (
    <StyledFieldWrapper showCopyButton={showCopyButton}>
      <StyledInput
        id={name}
        {...inputProps}
        {...field}
        isError={meta.error && meta.touched ? true : false}
        disabled={disabled}
        placeholder={placeholder}
      />
      {showCopyButton && (
        <ContextButton onClick={() => copyValue()} type="button">
          {t("common:copy")}
        </ContextButton>
      )}
    </StyledFieldWrapper>
  );

  return (
    <Column ai="stretch" w="100%">
      {hideLabel === false && (
        <StyledLabel htmlFor={name} version={version} data-ctx={ctx}>
          {labelToDisplay}
        </StyledLabel>
      )}
      {input}
      {!hideErrors && (
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

export default TextField;
