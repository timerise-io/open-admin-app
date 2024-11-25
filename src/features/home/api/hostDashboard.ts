import { gql } from "@apollo/client";
import { HostDashboardBookings } from "../model/hostDashboard";

export interface HostDashboardQueryVariables {
  projectId: string;
  hostId: string;
  now: Date;
  todayStart: Date;
  todayEnd: Date;
  tomorrowEnd: Date;
  weekEnd: Date;
}

export type HostDashboardQueryResult = HostDashboardBookings;

export const HOST_DASHBOARD = gql`
  query HostDashboard(
    $projectId: ID!
    $hostId: ID
    $now: DateTime
    $todayStart: DateTime
    $todayEnd: DateTime
    $tomorrowEnd: DateTime
    $weekEnd: DateTime
  ) {
    today: bookings(
      projectId: $projectId
      hostId: $hostId
      status: ACCEPTED
      dateTimeFrom: $todayStart
      dateTimeTo: $todayEnd
    ) {
      bookingId
      status
      dateTimeFrom
    }
    todayUpcoming: bookings(
      projectId: $projectId
      hostId: $hostId
      status: ACCEPTED
      dateTimeFrom: $now
      dateTimeTo: $todayEnd
    ) {
      bookingId
      dateTimeFrom
    }
    tomorrow: bookings(
      projectId: $projectId
      hostId: $hostId
      status: ACCEPTED
      dateTimeFrom: $todayEnd
      dateTimeTo: $tomorrowEnd
    ) {
      bookingId
      status
      dateTimeFrom
    }
    weekUpcoming: bookings(
      projectId: $projectId
      hostId: $hostId
      status: ACCEPTED
      dateTimeFrom: $now
      dateTimeTo: $weekEnd
    ) {
      bookingId
      status
      dateTimeFrom
    }
    todayAll: bookings(projectId: $projectId, hostId: $hostId, dateTimeFrom: $todayStart, dateTimeTo: $todayEnd) {
      bookingId
      status
      dateTimeFrom
    }
  }
`;
