import { useEffect } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { useRecoilState } from "recoil";
import { ACCEPT_BOOKING } from "../api/mutations/acceptBooking";
import { AcceptBookingMutationResult, AcceptBookingMutationVariables } from "../api/mutations/models";
import { selectedBookingAtom } from "../state/selectedBookingAtom";

export const useAcceptBooking = () => {
  const {
    mutation: acceptBookingMutation,
    data,
    loading,
    error,
  } = useTimeriseMutation<AcceptBookingMutationResult, AcceptBookingMutationVariables>({
    mutation: ACCEPT_BOOKING,
    loader: "ACCEPT_BOOKING",
    trigger: "BOOKINGS",
    successToast: { variant: "SUCCESS", type: "data-save", date: 0 },
    failToast: { variant: "ERROR", type: "data-save", date: 0 },
  });

  const [selectedBooking, setSelectedBooking] = useRecoilState(selectedBookingAtom);

  useEffect(() => {
    if (!loading && data?.bookingAccept && selectedBooking) {
      setSelectedBooking({ ...selectedBooking, status: "ACCEPTED" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, loading]);

  return (variables: AcceptBookingMutationVariables) => {
    acceptBookingMutation(variables);
  };
};
