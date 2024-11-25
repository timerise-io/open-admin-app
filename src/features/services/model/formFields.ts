export enum FORM_FIELD_TYPES {
  SYSTEM_FULL_NAME = "SYSTEM_FULL_NAME",
  SYSTEM_EMAIL_ADDRESS = "SYSTEM_EMAIL_ADDRESS",
  SYSTEM_PHONE_NUMBER = "SYSTEM_PHONE_NUMBER",
  SYSTEM_MESSAGE = "SYSTEM_MESSAGE",
  SYSTEM_SLOT_QUANTITY = "SYSTEM_SLOT_QUANTITY",
  SYSTEM_GUESTS_LIST = "SYSTEM_GUESTS_LIST",
  SYSTEM_ALLOWLIST_CODE = "SYSTEM_ALLOWLIST_CODE",
  SYSTEM_PROMO_CODE = "SYSTEM_PROMO_CODE",
  TEXT = "TEXT",
  NUMBER = "NUMBER",
  CHECKBOX = "CHECKBOX",
  FILE_UPLOAD = "FILE_UPLOAD",
}

export const FORM_FIELDS_WITH_PLACEHOLDER = [
  FORM_FIELD_TYPES.SYSTEM_FULL_NAME,
  FORM_FIELD_TYPES.SYSTEM_EMAIL_ADDRESS,
  FORM_FIELD_TYPES.SYSTEM_MESSAGE,
  FORM_FIELD_TYPES.SYSTEM_ALLOWLIST_CODE,
  FORM_FIELD_TYPES.SYSTEM_PROMO_CODE,
  FORM_FIELD_TYPES.TEXT,
];

export type FormFieldType = keyof typeof FORM_FIELD_TYPES;

export const FormFieldTypeDefaults: Record<FormFieldType, FormField> = {
  TEXT: {
    fieldId: "",
    required: false,
    label: "My text field",
    order: 0,
    fieldType: FORM_FIELD_TYPES.TEXT,
    width: 100,
    placeholder: "",
    validationRegex: null,
  },
  NUMBER: {
    fieldId: "",
    required: false,
    label: "My number field",
    order: 0,
    fieldType: FORM_FIELD_TYPES.NUMBER,
    width: 100,
  },
  CHECKBOX: {
    fieldId: "",
    required: false,
    label: "My checkbox",
    order: 0,
    fieldType: FORM_FIELD_TYPES.CHECKBOX,
    width: 100,
  },
  SYSTEM_FULL_NAME: {
    fieldId: "",
    required: false,
    label: "Full name",
    order: 0,
    fieldType: FORM_FIELD_TYPES.SYSTEM_FULL_NAME,
    width: 100,
    placeholder: "",
  },
  SYSTEM_EMAIL_ADDRESS: {
    fieldId: "",
    required: false,
    label: "E-mail",
    order: 0,
    fieldType: FORM_FIELD_TYPES.SYSTEM_EMAIL_ADDRESS,
    width: 100,
    placeholder: "",
  },
  SYSTEM_PHONE_NUMBER: {
    fieldId: "",
    required: false,
    label: "Phone number",
    order: 0,
    fieldType: FORM_FIELD_TYPES.SYSTEM_PHONE_NUMBER,
    width: 100,
  },
  SYSTEM_MESSAGE: {
    fieldId: "",
    required: false,
    label: "Message",
    order: 0,
    fieldType: FORM_FIELD_TYPES.SYSTEM_MESSAGE,
    width: 100,
    placeholder: "",
    height: 3,
  },
  SYSTEM_SLOT_QUANTITY: {
    fieldId: "",
    required: false,
    label: "Quantity",
    order: 0,
    fieldType: FORM_FIELD_TYPES.SYSTEM_SLOT_QUANTITY,
    width: 100,
    maxValue: 10,
  },
  SYSTEM_GUESTS_LIST: {
    fieldId: "",
    required: false,
    label: "Guests list",
    order: 0,
    fieldType: FORM_FIELD_TYPES.SYSTEM_GUESTS_LIST,
    minGuests: 1,
    maxGuests: 10,
  },
  SYSTEM_ALLOWLIST_CODE: {
    fieldId: "",
    required: false,
    label: "Allowlist code",
    order: 0,
    fieldType: FORM_FIELD_TYPES.SYSTEM_ALLOWLIST_CODE,
    width: 100,
    placeholder: "",
  },
  SYSTEM_PROMO_CODE: {
    fieldId: "",
    required: false,
    label: "Promo code",
    order: 0,
    fieldType: FORM_FIELD_TYPES.SYSTEM_PROMO_CODE,
    width: 100,
    placeholder: "",
  },
  FILE_UPLOAD: {
    fieldId: "",
    required: false,
    label: "File",
    order: 0,
    fieldType: FORM_FIELD_TYPES.FILE_UPLOAD,
    accept: "*",
    buttonText: "Upload files",
    capture: true,
    multiple: false,
  },
};

export interface BaseFormField {
  fieldId: string;
  required: boolean;
  label: string;
  order: number;
}

export type FormFieldSystemFullName = BaseFormField & {
  fieldType: FORM_FIELD_TYPES.SYSTEM_FULL_NAME;
  width: number;
  placeholder: string;
};

export type FormFieldSystemAllowlist = BaseFormField & {
  fieldType: FORM_FIELD_TYPES.SYSTEM_ALLOWLIST_CODE;
  width: number;
  placeholder: string;
};

export type FormFieldSystemPromoCode = BaseFormField & {
  fieldType: FORM_FIELD_TYPES.SYSTEM_PROMO_CODE;
  width: number;
  placeholder: string;
};

export type FormFieldSystemEmailAddress = BaseFormField & {
  fieldType: FORM_FIELD_TYPES.SYSTEM_EMAIL_ADDRESS;
  width: number;
  placeholder: string;
};

export type FormFieldSystemPhoneNumber = BaseFormField & {
  fieldType: FORM_FIELD_TYPES.SYSTEM_PHONE_NUMBER;
  width: number;
};

export type FormFieldSystemMessage = BaseFormField & {
  fieldType: FORM_FIELD_TYPES.SYSTEM_MESSAGE;
  width: number;
  height: number;
  placeholder: string;
};

export type FormFieldSystemSlotQuantity = BaseFormField & {
  fieldType: FORM_FIELD_TYPES.SYSTEM_SLOT_QUANTITY;
  width: number;
  maxValue: number;
};

export type FormFieldSystemGuestsList = BaseFormField & {
  fieldType: FORM_FIELD_TYPES.SYSTEM_GUESTS_LIST;
  minGuests?: number;
  maxGuests?: number;
};

export type FormFieldText = BaseFormField & {
  fieldType: FORM_FIELD_TYPES.TEXT;
  width: number;
  placeholder: string;
  validationRegex: string | null;
};

export type FormFieldNumber = BaseFormField & {
  fieldType: FORM_FIELD_TYPES.NUMBER;
  width: number;
  minValue?: number;
  maxValue?: number;
};

export type FormFieldCheckbox = BaseFormField & {
  fieldType: FORM_FIELD_TYPES.CHECKBOX;
  width: number;
};

export type FormFieldFileUpload = BaseFormField & {
  fieldType: FORM_FIELD_TYPES.FILE_UPLOAD;
  accept: string | null;
  buttonText: string | null;
  capture: boolean | null;
  multiple: boolean | null;
};

export type FormField =
  | FormFieldSystemFullName
  | FormFieldSystemEmailAddress
  | FormFieldSystemPhoneNumber
  | FormFieldSystemMessage
  | FormFieldSystemMessage
  | FormFieldSystemSlotQuantity
  | FormFieldSystemGuestsList
  | FormFieldSystemAllowlist
  | FormFieldSystemPromoCode
  | FormFieldText
  | FormFieldNumber
  | FormFieldCheckbox
  | FormFieldFileUpload;
