import { gql } from "@apollo/client";

export const CANCEL_BOOKING = gql`
  mutation CancelBooking($bookingId: ID!) {
    bookingCancel(bookingId: $bookingId) {
      bookingId
    }
  }
`;
