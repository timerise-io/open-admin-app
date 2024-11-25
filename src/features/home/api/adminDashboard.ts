import { gql } from "@apollo/client";
import { AdminDashboard } from "../model/adminDashboard";

export interface AdminDashboardQueryVariables {
  projectId: string;
  monthStart: Date;
  monthEnd: Date;
  weekStart: Date;
  weekEnd: Date;
}

export type AdminDashboardQueryResult = AdminDashboard;

export const ADMIN_DASHBOARD = gql`
  query ADMIN_DASHBOARD(
    $projectId: ID!
    $monthStart: DateTime
    $monthEnd: DateTime
    $weekStart: DateTime
    $weekEnd: DateTime
  ) {
    subscriptionReports: reports(projectId: $projectId, dateTimeFrom: $monthStart, dateTimeTo: $monthEnd) {
      SMS_SENT
      EMAIL_SENT
      BOOKING_CREATED
      dateTime
    }
    projectBookings: reports(projectId: $projectId, dateTimeFrom: $weekStart, dateTimeTo: $weekEnd) {
      BOOKING_BOOKED_ACCEPTED
      BOOKING_BOOKED_CANCELED
      dateTime
    }
  }
`;
