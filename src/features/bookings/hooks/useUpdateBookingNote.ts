import { useEffect } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { useToast } from "features/toast/hooks/useToast";
import { useRecoilState } from "recoil";
import { UpdateBookingNoteMutationResponse, UpdateBookingNoteMutationVariables } from "../api/mutations/models";
import { UPDATE_BOOKING_NOTE } from "../api/mutations/updateBookingNote";
import { selectedBookingAtom } from "../state/selectedBookingAtom";

export const useUpdateBookingNote = () => {
  const showToast = useToast();

  const {
    mutation: updateBookingNote,
    data,
    loading,
    error,
  } = useTimeriseMutation<UpdateBookingNoteMutationResponse, UpdateBookingNoteMutationVariables>({
    mutation: UPDATE_BOOKING_NOTE,
    loader: "UPDATE_BOOKING_NOTE",
    trigger: "BOOKINGS",
  });

  const [selectedBooking, setSelectedBooking] = useRecoilState(selectedBookingAtom);

  useEffect(() => {
    if (!loading && data?.bookingNoteUpdate?.bookingId && selectedBooking) {
      showToast({
        variant: "SUCCESS",
        type: "data-save",
        date: new Date().getTime(),
      });
      setSelectedBooking({ ...selectedBooking });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, loading]);

  return (variables: UpdateBookingNoteMutationVariables) => {
    updateBookingNote(variables);
  };
};
