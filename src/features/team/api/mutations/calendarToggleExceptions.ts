import { gql } from "@apollo/client";

export interface CalendarToggleExceptionsVariables {
  calendarId: string;
}

export interface CalendarToggleExceptionsResult {
  calendarToggleExceptionsSync: string;
}

export const CALENDAR_TOGGLE_EXCEPTIONS = gql`
  mutation CalendarToggleExceptionsSync($calendarId: ID!) {
    calendarToggleExceptionsSync(calendarId: $calendarId)
  }
`;
