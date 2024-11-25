import React from "react";
import { Card } from "components/Card";
import { DisplayField } from "components/DisplayField";
import { Typography } from "components/Typography";
import { Booking } from "features/bookings/model/booking";
import { FORM_FIELD_TYPES } from "features/services/model/formFields";
import { useTranslation } from "react-i18next";

interface BookingCustomerProps {
  booking: Booking;
}

export const BookingCustomer: React.FC<BookingCustomerProps> = ({ booking }) => {
  const { t } = useTranslation();
  const fields = [
    { label: t("full-name"), value: booking.formFields[FORM_FIELD_TYPES.SYSTEM_FULL_NAME], isBold: true },
    { label: t("phone"), value: booking.formFields[FORM_FIELD_TYPES.SYSTEM_PHONE_NUMBER] },
    { label: t("email"), value: booking.formFields[FORM_FIELD_TYPES.SYSTEM_EMAIL_ADDRESS], isBold: true },
    { label: t("message"), value: booking.formFields[FORM_FIELD_TYPES.SYSTEM_MESSAGE], wordBreak: true },
    { label: t("allowlist-code"), value: booking.formFields[FORM_FIELD_TYPES.SYSTEM_ALLOWLIST_CODE] },
    { label: t("promo-code"), value: booking.formFields[FORM_FIELD_TYPES.SYSTEM_PROMO_CODE] },
  ].filter((item) => item.value !== undefined);

  return (
    <>
      <Typography typographyType="h3" as="h3">
        {t("customer")}
      </Typography>
      <Card>
        <DisplayField label={t("customer-id")} text={booking.bookingId} showCopyButton />
        {fields.map((item, index) => {
          return (
            <DisplayField
              key={`booking-form-item-${index}`}
              label={item.label}
              text={item.value}
              showCopyButton
              disableBottomMargin={index === fields.length - 1}
              isBold={item.isBold}
              wordBreak={item.wordBreak}
            />
          );
        })}
      </Card>
    </>
  );
};
