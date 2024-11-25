import { useTimeriseQuery } from "features/api/hooks/useTimeriseQuery";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue } from "recoil";
import { CALENDARS, CalendarsQueryResult, CalendarsQueryVariables } from "../api/queries/calendars";

export const useCalendars = () => {
  const selectedProject = useRecoilValue(selectedProjectAtom);

  const { data, loading, error } = useTimeriseQuery<CalendarsQueryResult, CalendarsQueryVariables>({
    query: CALENDARS,
    loader: "CALENDARS",
    trigger: "CALENDARS",
    variables: { provider: "GOOGLE" },
    skip: !selectedProject,
  });

  return { data, loading, error };
};
