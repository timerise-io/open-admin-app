import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import {
  CALENDAR_TOGGLE_EXCEPTIONS,
  CalendarToggleExceptionsResult,
  CalendarToggleExceptionsVariables,
} from "../api/mutations/calendarToggleExceptions";

export const useCalendarToggleExceptions = () => {
  const { mutation, data } = useTimeriseMutation<CalendarToggleExceptionsResult, CalendarToggleExceptionsVariables>({
    mutation: CALENDAR_TOGGLE_EXCEPTIONS,
    loader: "CALENDARS",
    trigger: "CALENDARS",
    successToast: { variant: "SUCCESS", type: "data-save", date: 0 },
    failToast: { variant: "ERROR", type: "data-save", date: 0 },
  });

  return {
    mutation: (values: CalendarToggleExceptionsVariables) => {
      mutation(values);
    },
    data,
  };
};
