import { gql } from "@apollo/client";

export interface CalendarToggleBookingsVariables {
  calendarId: string;
}

export interface CalendarToggleBookingsResult {
  calendarToggleBookingsSync: string;
}

export const CALENDAR_TOGGLE_BOOKINGS = gql`
  mutation CalendarToggleBookingsSync($calendarId: ID!) {
    calendarToggleBookingsSync(calendarId: $calendarId)
  }
`;
