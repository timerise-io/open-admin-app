import { useEffect } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { useToast } from "features/toast/hooks/useToast";
import { useRecoilState } from "recoil";
import { RejectBookingMutationResult, RejectBookingMutationVariables } from "../api/mutations/models";
import { REJECT_BOOKING } from "../api/mutations/rejectBooking";
import { selectedBookingAtom } from "../state/selectedBookingAtom";

export const useRejectBooking = () => {
  const showToast = useToast();

  const {
    mutation: rejectBookingMutation,
    data,
    loading,
    error,
  } = useTimeriseMutation<RejectBookingMutationResult, RejectBookingMutationVariables>({
    mutation: REJECT_BOOKING,
    loader: "REJECT_BOOKING",
    trigger: "BOOKINGS",
  });

  const [selectedBooking, setSelectedBooking] = useRecoilState(selectedBookingAtom);

  useEffect(() => {
    if (!loading && data?.bookingReject && selectedBooking) {
      showToast({
        variant: "SUCCESS",
        type: "booking-rejected",
        date: new Date().getTime(),
      });
      setSelectedBooking({ ...selectedBooking, status: "REJECTED" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, loading]);

  return (variables: RejectBookingMutationVariables) => {
    rejectBookingMutation(variables);
  };
};
