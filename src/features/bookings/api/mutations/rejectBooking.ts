import { gql } from "@apollo/client";

export const REJECT_BOOKING = gql`
  mutation RejectBooking($projectId: ID!, $bookingId: ID!) {
    bookingReject(projectId: $projectId, bookingId: $bookingId) {
      bookingId
    }
  }
`;
