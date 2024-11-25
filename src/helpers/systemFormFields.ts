import { FORM_FIELD_TYPES, FormFieldType } from "features/services/model/formFields";
import { find } from "lodash";

export const SYSTEM_FORM_FIELDS: Array<FormFieldType> = [
  FORM_FIELD_TYPES.SYSTEM_FULL_NAME,
  FORM_FIELD_TYPES.SYSTEM_EMAIL_ADDRESS,
  FORM_FIELD_TYPES.SYSTEM_PHONE_NUMBER,
  FORM_FIELD_TYPES.SYSTEM_MESSAGE,
  FORM_FIELD_TYPES.SYSTEM_SLOT_QUANTITY,
  FORM_FIELD_TYPES.SYSTEM_GUESTS_LIST,
  FORM_FIELD_TYPES.SYSTEM_ALLOWLIST_CODE,
  FORM_FIELD_TYPES.SYSTEM_PROMO_CODE,
];

export const isSystemFormField = (fieldType: FormFieldType) => {
  return find(SYSTEM_FORM_FIELDS, (item) => item === fieldType);
};
