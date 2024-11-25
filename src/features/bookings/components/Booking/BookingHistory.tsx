import React, { useMemo, useState } from "react";
import { Typography } from "components/Typography";
import { Row } from "components/layout/Row";
import { format } from "date-fns";
import { BOOKING_HISTORY_STATUS, BOOKING_HISTORY_STATUS_LABELS } from "features/bookings/enums/BookingHistoryStatus";
import { Booking } from "features/bookings/model/booking";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

interface BookingDetailsProps {
  booking: Booking;
}

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  ${({ theme }) => {
    return css`
      color: ${theme.colors.primary};
    `;
  }}
`;

const StyledRow = styled(Row)`
  flex-direction: column;
`;

const StyledHistoryItem = styled(Row)`
  ${({ theme }) => {
    return css`
      width: 100%;
      margin-top: 4px;
      background-color: ${theme.colorSchemas.background.primary.color};
      flex: 1;
      display: flex;
      padding: 8px 12px;
      border-radius: ${theme.borderRadius};
      background-color: ${theme.colorSchemas.background.primary.color};
      margin-top: 4px;
      margin-bottom: 0;
      gap: 2px;
      flex-direction: column;
      align-items: flex-start;
    `;
  }}
`;

const getStatusColor = (status: BOOKING_HISTORY_STATUS, theme: any) => {
  switch (status) {
    case BOOKING_HISTORY_STATUS.BOOKING_CREATED:
      return theme.colors.primary;
    case BOOKING_HISTORY_STATUS.BOOKING_UPDATED:
    case BOOKING_HISTORY_STATUS.BOOKING_CONFIRMED:
    case BOOKING_HISTORY_STATUS.BOOKING_ACCEPTED:
    case BOOKING_HISTORY_STATUS.BOOKING_NOTE_UPDATED:
      return theme.colors.success;
    case BOOKING_HISTORY_STATUS.BOOKING_REJECTED:
    case BOOKING_HISTORY_STATUS.BOOKING_CANCELED:
      return theme.colors.error;
    default:
      return theme.colors.primary;
  }
};

const StyledLabel = styled(Typography)<{ status?: BOOKING_HISTORY_STATUS }>`
  margin: 0;
  ${({ status, theme }) => {
    return css`
      color: ${status ? getStatusColor(status, theme) : "inherit"};
    `;
  }}
`;

export const BookingHistory: React.FC<BookingDetailsProps> = ({ booking }) => {
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState(false);

  const getBookingHistory = useMemo(() => {
    if (booking?.statusLog?.length === 0) return [];
    if (showMore) {
      return booking.statusLog;
    }
    return booking.statusLog.slice(0, 1);
  }, [booking?.statusLog, showMore]);

  if (booking?.statusLog?.length === 0) return null;

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <Wrapper>
      <Row>
        <Typography as="label" typographyType="label">
          {t("bookings.booking-history")}
        </Typography>
        {booking?.statusLog?.length > 1 && (
          <StyledLink to={""} onClick={toggleShowMore}>
            <Typography typographyType="label" as="span">
              {showMore ? t("show-less") : t("show-more")}
            </Typography>
          </StyledLink>
        )}
      </Row>
      <StyledRow>
        {getBookingHistory.map((item, index) => {
          return (
            <StyledHistoryItem key={item.createdAt}>
              {item.event && (
                <StyledLabel typographyType="body" weight="700" status={item.event as BOOKING_HISTORY_STATUS}>
                  {BOOKING_HISTORY_STATUS_LABELS[item.event as keyof typeof BOOKING_HISTORY_STATUS_LABELS]}
                </StyledLabel>
              )}
              {item.createdAt && (
                <StyledLabel typographyType="body">
                  {format(new Date(item.createdAt), "E d MMM yyyy, H:mm")}
                </StyledLabel>
              )}
            </StyledHistoryItem>
          );
        })}
      </StyledRow>
    </Wrapper>
  );
};
