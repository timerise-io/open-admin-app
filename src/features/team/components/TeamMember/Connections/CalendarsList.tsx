import React from "react";
import Switch from "components/Switch";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { useCalendarToggleBookings } from "features/team/hooks/useCalendarToggleBookings";
import { useCalendarToggleExceptions } from "features/team/hooks/useCalendarToggleExceptions";
import { useCalendars } from "features/team/hooks/useCalendars";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Wrapper = styled.div`
  border-top: 1px solid #d9d9d9;
  width: 100%;
`;

const CalendarColumn = styled.div`
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
  justify-content: space-between;
`;

const CalendarsList = () => {
  const { t } = useTranslation();
  const { data } = useCalendars();
  const { mutation: toggleExceptions } = useCalendarToggleExceptions();
  const { mutation: toggleBookings } = useCalendarToggleBookings();

  if (!data || data.calendars.length === 0) return null;

  return (
    <Wrapper>
      {data.calendars.map((item, index) => {
        return (
          <CalendarColumn key={`calendar-item-${index}`}>
            <Row mb={1}>
              <img src="https://cdn.timerise.io/app/google_calendar.png" width="32" height="32" alt="google" />
              <Column ai="flex-start" ml={1}>
                <Typography typographyType="body" as="span">
                  Google
                </Typography>
                <Typography typographyType="body" as="span">
                  {item.title}
                </Typography>
              </Column>
            </Row>
            <Switch
              label={t("common:team.synchronize-bookings-with-calendar")}
              value={item.syncBookings}
              onChange={() => {
                toggleBookings({
                  calendarId: item.calendarId,
                });
              }}
              disable={!item.isWritable}
            />
            <Switch
              label={t("common:team.get-availability-from-calendar")}
              value={item.syncExceptions}
              onChange={() => {
                toggleExceptions({
                  calendarId: item.calendarId,
                });
              }}
            />
          </CalendarColumn>
        );
      })}
    </Wrapper>
  );
};

export default CalendarsList;
