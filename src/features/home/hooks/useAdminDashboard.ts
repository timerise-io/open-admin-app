import { useEffect } from "react";
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";
import { useTimeriseQuery } from "features/api/hooks/useTimeriseQuery";
import { currentUserAtom } from "features/auth/state/currentUserAtom";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ADMIN_DASHBOARD, AdminDashboardQueryResult, AdminDashboardQueryVariables } from "../api/adminDashboard";
import { adminDashboardAtom } from "../state/adminDashboardAtom";

export const useAdminDashboard = () => {
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const user = useRecoilValue(currentUserAtom);

  const now = new Date();

  const { data } = useTimeriseQuery<AdminDashboardQueryResult, AdminDashboardQueryVariables>({
    query: ADMIN_DASHBOARD,
    loader: "ADMIN_DASHBOARD",
    variables: {
      projectId: selectedProject ?? "",
      monthStart: startOfMonth(now),
      monthEnd: endOfMonth(now),
      weekStart: startOfWeek(now, { weekStartsOn: 1 }),
      weekEnd: endOfWeek(now, { weekStartsOn: 1 }),
    },
    skip: !selectedProject || !user,
  });

  const setAdminDashboard = useSetRecoilState(adminDashboardAtom);

  useEffect(() => {
    data !== undefined && setAdminDashboard({ ...data });
  }, [data, setAdminDashboard]);
};
