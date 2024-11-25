import React from "react";
import { Card } from "components/Card";
import { DisplayField } from "components/DisplayField";
import { Typography } from "components/Typography";
import { Booking } from "features/bookings/model/booking";
import { FORM_FIELD_TYPES } from "features/services/model/formFields";
import { omit } from "lodash";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledHeader = styled(Typography)`
  margin: 32px 0 15px 0;
`;

interface BookingCustomerProps {
  booking: Booking;
}

export const BookingFormData: React.FC<BookingCustomerProps> = ({ booking }) => {
  const { t } = useTranslation();
  const fields = omit(booking?.formFields, [
    FORM_FIELD_TYPES.SYSTEM_FULL_NAME,
    FORM_FIELD_TYPES.SYSTEM_PHONE_NUMBER,
    FORM_FIELD_TYPES.SYSTEM_EMAIL_ADDRESS,
    FORM_FIELD_TYPES.SYSTEM_MESSAGE,
    FORM_FIELD_TYPES.SYSTEM_ALLOWLIST_CODE,
    FORM_FIELD_TYPES.SYSTEM_PROMO_CODE,
  ]);

  const formFieldsLabels = booking?.formFieldsLabels || [];

  let formFields: any[] = [];
  formFieldsLabels.forEach((item) => {
    if (item && item.fieldId && fields[item.fieldId]) {
      const value = fields[item.fieldId].toString();
      const field = {
        fieldId: item.fieldId,
        order: item.order,
        label: item.label,
        value: value,
      };
      formFields.push(field);
    }
  });
  formFields = formFields.sort((a, b) => {
    return a.order - b.order;
  });

  if (formFields.length === 0) return null;

  return (
    <>
      <StyledHeader typographyType="h3" as="h3">
        {t("form-data")}
      </StyledHeader>
      <Card>
        {formFields.map((item, index) => {
          return (
            <DisplayField
              key={`booking-form-item-${index}`}
              label={item.label}
              text={item.value || item.label}
              showCopyButton
              disableBottomMargin={index === fields.length - 1}
            />
          );
        })}
      </Card>
    </>
  );
};
