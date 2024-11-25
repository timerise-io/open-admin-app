import { useEffect } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { useToast } from "features/toast/hooks/useToast";
import { useRecoilState } from "recoil";
import { CANCEL_BOOKING } from "../api/mutations/cancelBooking";
import { CancelBookingMutationResult, CancelBookingMutationVariables } from "../api/mutations/models";
import { selectedBookingAtom } from "../state/selectedBookingAtom";

export const useCancelBooking = () => {
  const showToast = useToast();

  const {
    mutation: cancelBookingMutation,
    data,
    loading,
    error,
  } = useTimeriseMutation<CancelBookingMutationResult, CancelBookingMutationVariables>({
    mutation: CANCEL_BOOKING,
    loader: "CANCEL_BOOKING",
    trigger: "BOOKINGS",
  });

  const [selectedBooking, setSelectedBooking] = useRecoilState(selectedBookingAtom);

  useEffect(() => {
    if (!loading && data?.bookingCancel && selectedBooking) {
      showToast({
        variant: "SUCCESS",
        type: "booking-canceled",
        date: new Date().getTime(),
      });
      setSelectedBooking({ ...selectedBooking, status: "CANCELED" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, loading]);

  return (variables: CancelBookingMutationVariables) => {
    cancelBookingMutation(variables);
  };
};
