export interface RejectBookingMutationVariables {
  projectId: string;
  bookingId: string;
}

export interface RejectBookingMutationResult {
  bookingReject: string;
}

export interface CancelBookingMutationVariables {
  bookingId: string;
}

export interface CancelBookingMutationResult {
  bookingCancel: string;
}

export interface ConfirmBookingMutationVariables {
  bookingId: string;
}

export interface ConfirmBookingMutationResult {
  bookingConfirm: string;
}

export interface AcceptBookingMutationVariables {
  projectId: string;
  bookingId: string;
}

export interface AcceptBookingMutationResult {
  bookingAccept: string;
}

export interface UpdateBookingNoteMutationVariables {
  projectId: string;
  bookingId: string;
  note: string;
}

export interface UpdateBookingNoteMutationResponse {
  bookingNoteUpdate: {
    bookingId: string;
    note: string;
  };
}
