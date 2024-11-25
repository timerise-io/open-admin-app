import { useEffect } from "react";
import { add, endOfDay, endOfWeek, startOfDay, startOfMinute } from "date-fns";
import { useTimeriseQuery } from "features/api/hooks/useTimeriseQuery";
import { currentUserAtom } from "features/auth/state/currentUserAtom";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { HOST_DASHBOARD, HostDashboardQueryResult, HostDashboardQueryVariables } from "../api/hostDashboard";
import { hostDashboardAtom } from "../state/hostDashboardAtom";

export const useHostDashboard = () => {
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const user = useRecoilValue(currentUserAtom);

  const now = new Date();

  const { data } = useTimeriseQuery<HostDashboardQueryResult, HostDashboardQueryVariables>({
    query: HOST_DASHBOARD,
    loader: "HOST_DASHBOARD",
    variables: {
      projectId: selectedProject ?? "",
      hostId: user?.userId ?? "",
      now: startOfMinute(now),
      todayStart: startOfDay(now),
      todayEnd: endOfDay(now),
      tomorrowEnd: endOfDay(add(now, { days: 1 })),
      weekEnd: endOfWeek(now),
    },
    skip: !selectedProject || !user,
  });

  const setHostDashboard = useSetRecoilState(hostDashboardAtom);

  useEffect(() => {
    data !== undefined && setHostDashboard(data);
  }, [data, setHostDashboard]);
};
