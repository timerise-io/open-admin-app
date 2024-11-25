import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import {
  CALENDAR_TOGGLE_BOOKINGS,
  CalendarToggleBookingsResult,
  CalendarToggleBookingsVariables,
} from "../api/mutations/calendarToggleBookings";

export const useCalendarToggleBookings = () => {
  const { mutation, data } = useTimeriseMutation<CalendarToggleBookingsResult, CalendarToggleBookingsVariables>({
    mutation: CALENDAR_TOGGLE_BOOKINGS,
    loader: "CALENDARS",
    trigger: "CALENDARS",
    successToast: { variant: "SUCCESS", type: "data-save", date: 0 },
    failToast: { variant: "ERROR", type: "data-save", date: 0 },
  });

  return {
    mutation: (values: CalendarToggleBookingsVariables) => {
      mutation(values);
    },
    data,
  };
};
