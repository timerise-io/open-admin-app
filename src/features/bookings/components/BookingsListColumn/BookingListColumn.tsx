import React from "react";
import { Typography } from "components/Typography";
import { ROUTES } from "constans/routes";
import { CustomBookingFilters, useBookingsByFilter } from "features/bookings/hooks/useBookingsByFilter";
import { Booking } from "features/bookings/model/booking";
import { bookingsFilterAtom } from "features/bookings/state/bookingsFilterAtom";
import { useTimezoneFormat } from "helpers/hooks/useTimezoneFormat";
import { generatePath, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IconChevronRight } from "@tabler/icons";

const StyledHeader = styled(Typography)`
  margin-top: 32px;
`;

const SingleLineCard = styled.button`
  all: unset;
  box-sizing: border-box;
  width: 334px;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  padding: 8px 12px;
  margin-bottom: 8px;
  font-size: 13px;
  line-height: 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

const SeeMoreButton = styled(SingleLineCard)`
  justify-content: center;
`;

interface BookingListColumnProps {
  title?: string;
  filters: CustomBookingFilters;
}

const BookingListColumn = ({ filters, title = "Bookings" }: BookingListColumnProps) => {
  const { format } = useTimezoneFormat();

  const setBookingFilters = useSetRecoilState(bookingsFilterAtom);

  const { data } = useBookingsByFilter(filters);
  const navigate = useNavigate();

  const bookingsArray: Array<Booking> = Object.values(data?.bookings ?? {}).sort((a: Booking, b: Booking) => {
    return new Date(b.dateTimeFrom).getTime() - new Date(a.dateTimeFrom).getTime();
  });

  if (bookingsArray.length === 0) return null;

  return (
    <div>
      <StyledHeader typographyType="h3" as="h3">
        {title}
      </StyledHeader>
      {bookingsArray.slice(0, 5).map((item, index) => {
        return (
          <SingleLineCard
            key={`location-booking-${index}`}
            onClick={() => {
              navigate(generatePath(ROUTES.booking, { id: item.bookingId }));
            }}
          >
            <Typography typographyType="body" as="span">
              {`${item.formFields.SYSTEM_FULL_NAME ?? "--"} - ${format(item.dateTimeFrom, "dd MMM, H:mm")}`}
            </Typography>
            <IconChevronRight size={20} />
          </SingleLineCard>
        );
      })}
      {bookingsArray.length > 5 && (
        <SeeMoreButton
          onClick={() => {
            setBookingFilters({ ...filters });
            navigate(ROUTES.bookings);
          }}
        >
          <Typography typographyType="body" as="span" weight="700">
            See more
          </Typography>
        </SeeMoreButton>
      )}
    </div>
  );
};

export default React.memo(BookingListColumn);
