import React, { useCallback, useMemo, useState } from "react";
import { Button } from "components/Button";
import ConfirmModal from "components/ConfirmModal";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { PageContent } from "components/layout/PageContent";
import { PageHeader } from "components/layout/PageHeader";
import { Row } from "components/layout/Row";
import { DetailsPageLoader } from "components/loaders/DetailsPageLoader";
import { ROUTES } from "constans/routes";
import { BOOKING_STATUS } from "features/bookings/enums";
import { useAcceptBooking } from "features/bookings/hooks/useAcceptBooking";
import { useBooking } from "features/bookings/hooks/useBooking";
import { useRejectBooking } from "features/bookings/hooks/useRejectBooking";
import { selectedBookingAtom } from "features/bookings/state/selectedBookingAtom";
import { DisplayType } from "features/services/api/mutations/models";
import { FORM_FIELD_TYPES } from "features/services/model/formFields";
import { getDatesValue } from "helpers";
import { useTimezoneFormat } from "helpers/hooks/useTimezoneFormat";
import { useTranslation } from "react-i18next";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { BookingCustomer } from "./BookingCustomer";
import { BookingDetails } from "./BookingDetails";
import { BookingFormData } from "./BookingFormData";
import { BookingNote } from "./BookingNote";
import RescheduleModal from "./RescheduleModal";

const DetailColumn = styled(Column)`
  flex: 1;
  max-width: 800px;
  justify-content: flex-start;
  align-items: flex-start;
`;

const SectionWrapperRow = styled(Row)`
  gap: 32px;
`;

const StyledHeaderRow = styled(Row)`
  width: 560px;
  gap: 10px;
`;

const StyledCancelTypography = styled(Typography)`
  margin-top: 14px;
  margin-bottom: 14px;
`;

export const Booking = () => {
  const { t } = useTranslation();
  const { format } = useTimezoneFormat();
  const rejectBooking = useRejectBooking();
  const acceptBooking = useAcceptBooking();
  const { id } = useParams<{ id: string }>();
  useBooking(id!);
  const booking = useRecoilValue(selectedBookingAtom);
  const navigate = useNavigate();
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);

  const isCalendar = useMemo(() => {
    return booking?.service?.viewConfig?.displayType === DisplayType.CALENDAR;
  }, [booking?.service?.viewConfig?.displayType]);

  const isPreorder = useMemo(() => {
    return booking?.service?.viewConfig?.displayType === DisplayType.PREORDER;
  }, [booking?.service?.viewConfig?.displayType]);

  const getBookingDate = useCallback(() => {
    if (!booking) return "";

    return isCalendar || isPreorder
      ? getDatesValue({
          dateTimeFrom: booking.dateTimeFrom,
          dateTimeTo: booking.dateTimeTo,
          format,
          /* @ts-ignore */
          viewConfig: booking.service.viewConfig,
        })
      : format(booking.dateTimeFrom, "E d MMM, H:mm");
  }, [booking, format, isCalendar, isPreorder]);

  return (
    <>
      <PageHeader
        title={booking ? `${booking.formFields[FORM_FIELD_TYPES.SYSTEM_FULL_NAME] ?? ""} - ${getBookingDate()}` : ""}
        showBackButton
      >
        {booking && booking.service.serviceId && (
          <StyledHeaderRow>
            <Button
              buttonType="positive"
              onClick={() => {
                setAcceptModalOpen(true);
              }}
              disabled={booking.status === BOOKING_STATUS.ACCEPTED}
            >
              {t("bookings.accept-booking")}
            </Button>
            <Button
              buttonType="danger"
              onClick={() => {
                setRejectModalOpen(true);
              }}
              disabled={booking.status === BOOKING_STATUS.CANCELED || booking.status === BOOKING_STATUS.REJECTED}
            >
              {t("bookings.reject-booking")}
            </Button>
            <RescheduleModal bookingId={booking.bookingId} disabled={booking.status !== BOOKING_STATUS.ACCEPTED} />
            <Button
              style={{ display: "none" }}
              buttonType="secondary"
              onClick={() => {
                navigate(
                  generatePath(ROUTES.service, {
                    id: booking.service.serviceId,
                  }),
                );
              }}
            >
              {t("bookings.go-to-service")}
            </Button>
          </StyledHeaderRow>
        )}
      </PageHeader>
      <PageContent>
        {booking === undefined ? (
          <DetailsPageLoader />
        ) : (
          <SectionWrapperRow ai="stretch" jc="flex-start">
            <DetailColumn w="432px">
              <BookingDetails booking={booking} />
            </DetailColumn>
            <DetailColumn w="432px">
              <BookingCustomer booking={booking} />
              <BookingFormData booking={booking} />
              <BookingNote booking={booking} />
            </DetailColumn>
          </SectionWrapperRow>
        )}
      </PageContent>
      <ConfirmModal
        open={acceptModalOpen}
        title={t("bookings.accept-booking")}
        confirmText={t("bookings.accept-booking")}
        confirmButtonType="positive"
        abortText="Discard"
        onClose={() => {
          setAcceptModalOpen(false);
        }}
        onAbort={() => {
          setAcceptModalOpen(false);
        }}
        onConfirm={() => {
          acceptBooking({ projectId: booking?.project.projectId!, bookingId: id! });
          setAcceptModalOpen(false);
        }}
      >
        <StyledCancelTypography typographyType="body" as="span">
          Are you sure you want to <strong>accept</strong> this booking?
        </StyledCancelTypography>
      </ConfirmModal>
      <ConfirmModal
        open={rejectModalOpen}
        title={t("bookings.reject-booking")}
        confirmText={t("bookings.reject-booking")}
        confirmButtonType="danger"
        abortText={t("discard")}
        onClose={() => {
          setRejectModalOpen(false);
        }}
        onAbort={() => {
          setRejectModalOpen(false);
        }}
        onConfirm={() => {
          rejectBooking({ projectId: booking?.project.projectId!, bookingId: id! });
          setRejectModalOpen(false);
        }}
      >
        <StyledCancelTypography typographyType="body" as="span">
          Are you sure you want to <strong>reject</strong> this booking?
        </StyledCancelTypography>
      </ConfirmModal>
    </>
  );
};
