import { Calendar } from "features/team/models/calendar";
import { gql } from "@apollo/client";

export interface CalendarsQueryVariables {
  provider: string;
}

export interface CalendarsQueryResult {
  calendars: Array<Calendar>;
}

export const CALENDARS = gql`
  query Calendars($provider: CalendarProvider!) {
    calendars(provider: $provider) {
      userId
      calendarId
      title
      syncBookings
      syncExceptions
      isWritable
    }
  }
`;
