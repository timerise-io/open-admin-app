import { useTimeriseQuery } from "features/api/hooks/useTimeriseQuery";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue } from "recoil";
import {
  CALENDARS_AUTH_URL,
  CalendarsAuthUrlQueryResult,
  CalendarsAuthUrlQueryVariables,
} from "../api/queries/calendarsAuthUrl";

export const useCalendarAuthUrl = () => {
  const selectedProject = useRecoilValue(selectedProjectAtom);

  const { data, loading, error } = useTimeriseQuery<CalendarsAuthUrlQueryResult, CalendarsAuthUrlQueryVariables>({
    query: CALENDARS_AUTH_URL,
    loader: "CALENDARS_AUTH_URL",
    variables: { provider: "GOOGLE" },
    skip: !selectedProject,
  });

  return { data, loading, error };
};
