import { gql } from "@apollo/client";

export const UPDATE_BOOKING_NOTE = gql`
  mutation BookingNoteUpdate($projectId: ID!, $bookingId: ID!, $note: String!) {
    bookingNoteUpdate(projectId: $projectId, bookingId: $bookingId, note: $note) {
      bookingId
      note
    }
  }
`;
