import { useEffect } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { useRecoilState } from "recoil";
import { CONFIRM_BOOKING } from "../api/mutations/confirmBooking";
import { ConfirmBookingMutationResult, ConfirmBookingMutationVariables } from "../api/mutations/models";
import { selectedBookingAtom } from "../state/selectedBookingAtom";

export const useConfirmBooking = () => {
  const {
    mutation: confirmBookingMutation,
    data,
    loading,
    error,
  } = useTimeriseMutation<ConfirmBookingMutationResult, ConfirmBookingMutationVariables>({
    mutation: CONFIRM_BOOKING,
    loader: "CONFIRM_BOOKING",
    trigger: "BOOKINGS",
    successToast: { variant: "SUCCESS", type: "data-save", date: 0 },
    failToast: { variant: "ERROR", type: "data-save", date: 0 },
  });

  const [selectedBooking, setSelectedBooking] = useRecoilState(selectedBookingAtom);

  useEffect(() => {
    if (!loading && data?.bookingConfirm && selectedBooking) {
      setSelectedBooking({ ...selectedBooking, status: "ACCEPTED" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, loading]);

  return (variables: ConfirmBookingMutationVariables) => {
    confirmBookingMutation(variables);
  };
};
