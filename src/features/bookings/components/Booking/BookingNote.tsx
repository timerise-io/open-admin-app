import React from "react";
import { Card } from "components/Card";
import { ContextButton } from "components/ContextButton";
import { Typography } from "components/Typography";
import TextField from "components/forms/TextField";
import { Row } from "components/layout/Row";
import { useUpdateBookingNote } from "features/bookings/hooks/useUpdateBookingNote";
import { Booking } from "features/bookings/model/booking";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledHeader = styled(Typography)`
  margin: 32px 0 15px 0;
`;

interface BookingNoteProps {
  booking: Booking;
}

export const BookingNote: React.FC<BookingNoteProps> = ({ booking }) => {
  const { t } = useTranslation();
  const updateBookingNote = useUpdateBookingNote();
  return (
    <>
      <StyledHeader typographyType="h3" as="h3">
        {t("note")}
      </StyledHeader>
      <Card>
        <Formik
          initialValues={{
            note: booking.note,
          }}
          onSubmit={(formValues, { resetForm }) => {
            updateBookingNote({
              projectId: booking.project.projectId,
              bookingId: booking.bookingId,
              note: formValues.note,
            });
            resetForm({ values: { ...formValues } });
          }}
        >
          {({ isValid, dirty, resetForm }) => {
            return (
              <Form>
                <TextField name="note" hideLabel hideErrors multiline />
                <Row gap="8px" jc="flex-end" mt={2.5}>
                  <ContextButton
                    onClick={() => {
                      resetForm();
                    }}
                    disabled={!dirty}
                  >
                    {t("discard")}
                  </ContextButton>
                  <ContextButton disabled={!isValid || !dirty} type="submit">
                    {t("save")}
                  </ContextButton>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </>
  );
};
