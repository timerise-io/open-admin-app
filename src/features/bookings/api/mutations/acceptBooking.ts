import { gql } from "@apollo/client";

export const ACCEPT_BOOKING = gql`
  mutation BookingAccept($projectId: ID!, $bookingId: ID!) {
    bookingAccept(projectId: $projectId, bookingId: $bookingId) {
      bookingId
    }
  }
`;
