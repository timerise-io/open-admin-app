import React from "react";
import { Card } from "components/Card";
import { Typography } from "components/Typography";
import { FORM_FIELD_TYPES, FormField, FormFieldType, FormFieldTypeDefaults } from "features/services/model/formFields";
import { useField } from "formik";
import { isSystemFormField } from "helpers/systemFormFields";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import AddItemRow from "./AddItemRow";
import BookingPageFormField from "./BookingPageFormField/BookingPageFormField";

const StyledHeader = styled(Typography)`
  margin-top: 32px;
`;

const BookingPageFormElements = () => {
  const { t } = useTranslation();
  const [, meta, helpers] = useField<Array<FormField>>({ name: "formFields" });
  const systemFieldsInUse = meta.value.map((item) => {
    return item.fieldType;
  });
  const fieldsInOrder = [...meta.value].sort((a, b) => a.order - b.order);

  const addFiledHandler = (formFieldType: FormFieldType, index: number) => {
    const fieldId = isSystemFormField(formFieldType) ? formFieldType : new Date().getTime().toString();

    const existingIndex = _.findIndex(fieldsInOrder, ["fieldId", fieldId]);

    if (existingIndex !== -1) return;

    const prevItems = fieldsInOrder.slice(0, index);
    const nextItems = fieldsInOrder.slice(index).map((item) => {
      return { ...item, order: item.order + 1 };
    });

    const newField = {
      ...FormFieldTypeDefaults[formFieldType],
      fieldId,
      order: fieldsInOrder.length
        ? fieldsInOrder[fieldsInOrder.length > index ? index : fieldsInOrder.length - 1].order +
          (fieldsInOrder.length > index ? 0 : 1)
        : 1,
    };

    helpers.setValue([...prevItems, ...nextItems, { ...newField }]);
  };

  return (
    <>
      <StyledHeader typographyType="h3" as="h3">
        {t("services.form-elements")}
      </StyledHeader>
      <Card>
        <Typography typographyType="body" as="span">
          {t("services.form-elements-info")}
        </Typography>
        {fieldsInOrder.map((item, index) => {
          return (
            <React.Fragment key={`booking-page-form-field-${index}`}>
              <AddItemRow
                values={systemFieldsInUse}
                addField={(newValue) => {
                  addFiledHandler(newValue, index);
                }}
              />
              <BookingPageFormField
                formField={item}
                canMoveUp={index > 0}
                canMoveDown={index < fieldsInOrder.length - 1}
                onLabelChange={(value) => {
                  const newValues = [...meta.value];

                  const itemIndex = newValues.findIndex((a) => a.fieldId === item.fieldId);

                  newValues.splice(itemIndex, 1, {
                    ...meta.value[itemIndex],
                    label: value,
                  });
                  helpers.setValue(newValues);
                }}
                onPlaceholderChange={(value) => {
                  const newValues = [...meta.value];

                  const itemIndex = newValues.findIndex((a) => a.fieldId === item.fieldId);

                  const itemToChange = meta.value[itemIndex];

                  if (
                    itemToChange.fieldType === FORM_FIELD_TYPES.SYSTEM_FULL_NAME ||
                    itemToChange.fieldType === FORM_FIELD_TYPES.SYSTEM_EMAIL_ADDRESS ||
                    itemToChange.fieldType === FORM_FIELD_TYPES.SYSTEM_MESSAGE ||
                    itemToChange.fieldType === FORM_FIELD_TYPES.TEXT ||
                    itemToChange.fieldType === FORM_FIELD_TYPES.SYSTEM_ALLOWLIST_CODE ||
                    itemToChange.fieldType === FORM_FIELD_TYPES.SYSTEM_PROMO_CODE
                  ) {
                    newValues.splice(itemIndex, 1, {
                      ...itemToChange,
                      placeholder: value,
                    });
                    helpers.setValue(newValues);
                  }
                }}
                onValidationChange={(value) => {
                  const newValues = [...meta.value];

                  const itemIndex = newValues.findIndex((a) => a.fieldId === item.fieldId);

                  const itemToChange = meta.value[itemIndex];

                  if (itemToChange.fieldType === FORM_FIELD_TYPES.TEXT) {
                    newValues.splice(itemIndex, 1, {
                      ...itemToChange,
                      validationRegex: value,
                    });
                    helpers.setValue(newValues);
                  }
                }}
                onButtonTextChange={(value) => {
                  const newValues = [...meta.value];

                  const itemIndex = newValues.findIndex((a) => a.fieldId === item.fieldId);

                  const itemToChange = meta.value[itemIndex];

                  if (itemToChange.fieldType === FORM_FIELD_TYPES.FILE_UPLOAD) {
                    newValues.splice(itemIndex, 1, {
                      ...itemToChange,
                      buttonText: value,
                    });
                    helpers.setValue(newValues);
                  }
                }}
                moveUp={() => {
                  const newValues = [...meta.value];
                  const nextId = item.fieldId;
                  const prevId = fieldsInOrder[index - 1].fieldId;

                  const itemNextIndex = newValues.findIndex((a) => a.fieldId === nextId);

                  const itemPrevIndex = newValues.findIndex((a) => a.fieldId === prevId);

                  const nextOrder = newValues[itemNextIndex].order;
                  const prevOrder = newValues[itemPrevIndex].order;

                  newValues[itemNextIndex] = {
                    ...newValues[itemNextIndex],
                    order: prevOrder,
                  };
                  newValues[itemPrevIndex] = {
                    ...newValues[itemPrevIndex],
                    order: nextOrder,
                  };
                  helpers.setValue(newValues);
                }}
                moveDown={() => {
                  const newValues = [...meta.value];
                  const prevId = item.fieldId;
                  const nextId = fieldsInOrder[index + 1].fieldId;

                  const itemNextIndex = newValues.findIndex((a) => a.fieldId === nextId);

                  const itemPrevIndex = newValues.findIndex((a) => a.fieldId === prevId);

                  const nextOrder = newValues[itemNextIndex].order;
                  const prevOrder = newValues[itemPrevIndex].order;

                  newValues[itemNextIndex] = {
                    ...newValues[itemNextIndex],
                    order: prevOrder,
                  };
                  newValues[itemPrevIndex] = {
                    ...newValues[itemPrevIndex],
                    order: nextOrder,
                  };
                  helpers.setValue(newValues);
                }}
                onWidthChange={(value) => {
                  if (
                    item.fieldType === FORM_FIELD_TYPES.FILE_UPLOAD ||
                    item.fieldType === FORM_FIELD_TYPES.SYSTEM_GUESTS_LIST
                  )
                    return;

                  const newValues = [...meta.value];

                  const itemIndex = newValues.findIndex((a) => a.fieldId === item.fieldId);

                  newValues.splice(itemIndex, 1, {
                    // ...meta.value[itemIndex],
                    ...item,
                    width: value ? 50 : 100,
                  });
                  helpers.setValue(newValues);
                }}
                onDelete={() => {
                  const newValues = [...meta.value];

                  const itemIndex = newValues.findIndex((a) => a.fieldId === item.fieldId);

                  newValues.splice(itemIndex, 1);

                  helpers.setValue(newValues);
                }}
                onRequiredChange={(value: boolean) => {
                  const newValues = [...meta.value];

                  const itemIndex = newValues.findIndex((a) => a.fieldId === item.fieldId);

                  newValues.splice(itemIndex, 1, {
                    ...meta.value[itemIndex],
                    required: value,
                  });
                  helpers.setValue(newValues);
                }}
              />
            </React.Fragment>
          );
        })}
        <AddItemRow
          values={systemFieldsInUse}
          addField={(newValue) => {
            addFiledHandler(newValue, fieldsInOrder.length);
          }}
        />
      </Card>
    </>
  );
};

export default BookingPageFormElements;
