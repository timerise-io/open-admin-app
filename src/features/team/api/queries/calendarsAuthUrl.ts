import { gql } from "@apollo/client";

export interface CalendarsAuthUrlQueryVariables {
  provider: string;
}

export interface CalendarsAuthUrlQueryResult {
  calendarsAuthUrl: string;
}

export const CALENDARS_AUTH_URL = gql`
  query CalendarsAuthUrl($provider: CalendarProvider!) {
    calendarsAuthUrl(provider: $provider)
  }
`;
