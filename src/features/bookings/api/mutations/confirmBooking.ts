import { gql } from "@apollo/client";

export const CONFIRM_BOOKING = gql`
  mutation BookingConfirm($bookingId: ID!) {
    bookingConfirm(bookingId: $bookingId) {
      bookingId
    }
  }
`;
