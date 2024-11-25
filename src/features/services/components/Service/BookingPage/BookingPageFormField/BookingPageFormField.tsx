import React, { useCallback } from "react";
import Checkbox from "components/Checkbox";
import { SquareIconButton } from "components/SquareIconButton";
import StyledInput from "components/StyledInput";
import StyledLabel from "components/StyledLabel";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { FORM_FIELD_TYPES, FormField, FormFieldType } from "features/services/model/formFields";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IconArrowNarrowDown, IconArrowNarrowUp, IconTrash } from "@tabler/icons";
import ValidationRegexInput from "./ValidationRegexInput";

export const fieldsTypesToName: Record<FormFieldType, string> = {
  [FORM_FIELD_TYPES.SYSTEM_EMAIL_ADDRESS]: "Email",
  [FORM_FIELD_TYPES.SYSTEM_FULL_NAME]: "Full name",
  [FORM_FIELD_TYPES.SYSTEM_MESSAGE]: "Message",
  [FORM_FIELD_TYPES.SYSTEM_PHONE_NUMBER]: "Phone number",
  [FORM_FIELD_TYPES.SYSTEM_SLOT_QUANTITY]: "Slots to book",
  [FORM_FIELD_TYPES.SYSTEM_GUESTS_LIST]: "Guests list",
  [FORM_FIELD_TYPES.SYSTEM_ALLOWLIST_CODE]: "Allowlist code",
  [FORM_FIELD_TYPES.SYSTEM_PROMO_CODE]: "Promo code",
  [FORM_FIELD_TYPES.TEXT]: "Text",
  [FORM_FIELD_TYPES.NUMBER]: "Number",
  [FORM_FIELD_TYPES.CHECKBOX]: "Checkbox",
  [FORM_FIELD_TYPES.FILE_UPLOAD]: "File upload",
};

const Wrapper = styled(Column)`
  background: #f6f6f6;
  padding: 20px;
  border-radius: 4px;
`;

const FormFieldLabel = styled(StyledLabel)`
  margin-top: 20px;
`;

const FormFieldHint = styled(StyledLabel)`
  margin-top: 4px;
  margin-bottom: 0;
`;

const FormFieldInput = styled(StyledInput)`
  width: -webkit-fill-available;
`;

interface BookingPageFormFieldProps {
  formField: FormField;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onLabelChange: (value: string) => void;
  onPlaceholderChange: (value: string) => void;
  onValidationChange: (value: string) => void;
  moveUp: () => void;
  moveDown: () => void;
  onDelete: () => void;
  onRequiredChange: (value: boolean) => void;
  onWidthChange: (value: boolean) => void;
  onButtonTextChange: (value: string) => void;
}

const getPlaceholderValue = (formField: FormField) => {
  if (
    formField.fieldType === FORM_FIELD_TYPES.SYSTEM_FULL_NAME ||
    formField.fieldType === FORM_FIELD_TYPES.SYSTEM_EMAIL_ADDRESS ||
    formField.fieldType === FORM_FIELD_TYPES.SYSTEM_MESSAGE ||
    formField.fieldType === FORM_FIELD_TYPES.SYSTEM_ALLOWLIST_CODE ||
    formField.fieldType === FORM_FIELD_TYPES.SYSTEM_PROMO_CODE ||
    formField.fieldType === FORM_FIELD_TYPES.TEXT
  ) {
    return formField.placeholder ?? "";
  }
  return null;
};

const BookingPageFormField = ({
  formField,
  canMoveUp,
  canMoveDown,
  onLabelChange,
  onPlaceholderChange,
  onValidationChange,
  moveUp,
  moveDown,
  onDelete,
  onRequiredChange,
  onWidthChange,
  onButtonTextChange,
}: BookingPageFormFieldProps) => {
  const { t } = useTranslation();
  const placeholder = getPlaceholderValue(formField);

  const getLabelText = useCallback(() => {
    return formField.fieldType === FORM_FIELD_TYPES.CHECKBOX ? t("text") : t("label");
  }, [formField.fieldType, t]);

  return (
    <Wrapper ai="stretch">
      <Typography typographyType="h3" as="span" weight="700">
        {fieldsTypesToName[formField.fieldType]}
      </Typography>
      <FormFieldLabel>{getLabelText()}</FormFieldLabel>
      <FormFieldInput
        value={formField.label}
        onChange={(event) => {
          onLabelChange(event.target.value);
        }}
      />
      {formField.fieldType === FORM_FIELD_TYPES.CHECKBOX && <FormFieldHint>{t("check-box-info")}</FormFieldHint>}
      {placeholder !== null && (
        <>
          <FormFieldLabel>{t("placeholder")}</FormFieldLabel>
          <FormFieldInput
            value={placeholder}
            onChange={(event) => {
              onPlaceholderChange(event.target.value);
            }}
          />
        </>
      )}
      {formField.fieldType === FORM_FIELD_TYPES.FILE_UPLOAD && (
        <>
          <FormFieldLabel>{t("button")}</FormFieldLabel>
          <FormFieldInput
            value={formField.buttonText ?? ""}
            onChange={(event) => {
              onButtonTextChange(event.target.value);
            }}
          />
        </>
      )}
      {formField.fieldType === FORM_FIELD_TYPES.TEXT && (
        <ValidationRegexInput
          onValidationChange={onValidationChange}
          validationRegex={formField.validationRegex ?? ""}
        />
      )}
      <Row mt={2.5}>
        <Row gap="20px">
          <Checkbox
            label={t("required")}
            value={formField.required}
            onChange={(value) => {
              onRequiredChange(value);
            }}
          />
          {formField.fieldType !== FORM_FIELD_TYPES.FILE_UPLOAD &&
            formField.fieldType !== FORM_FIELD_TYPES.CHECKBOX &&
            formField.fieldType !== FORM_FIELD_TYPES.SYSTEM_GUESTS_LIST && (
              <Checkbox
                label={t("narrow-width")}
                value={formField.width !== 100}
                onChange={(value) => {
                  onWidthChange(value);
                }}
              />
            )}
        </Row>
        <Row gap="20px">
          <Row gap="4px">
            <SquareIconButton type="button" disabled={!canMoveUp} onClick={moveUp}>
              <IconArrowNarrowUp size={20} />
            </SquareIconButton>
            <SquareIconButton type="button" disabled={!canMoveDown} onClick={moveDown}>
              <IconArrowNarrowDown size={20} />
            </SquareIconButton>
          </Row>
          <SquareIconButton type="button" variant="danger" onClick={onDelete}>
            <IconTrash size={20} />
          </SquareIconButton>
        </Row>
      </Row>
    </Wrapper>
  );
};

export default BookingPageFormField;
