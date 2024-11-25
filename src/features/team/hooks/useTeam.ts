import { useEffect } from "react";
import { useTimeriseQuery } from "features/api/hooks/useTimeriseQuery";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { TeamQueryResult, TeamQueryVariables } from "../api/models";
import { TEAM } from "../api/team";
import { User } from "../models/user";
import { teamAtom } from "../state/teamAtom";

export const useTeam = () => {
  const selectedProject = useRecoilValue(selectedProjectAtom);

  const { data } = useTimeriseQuery<TeamQueryResult, TeamQueryVariables>({
    query: TEAM,
    loader: "TEAM",
    trigger: "TEAM_MEMBERS",
    variables: { projectId: selectedProject ?? "" },
    skip: !selectedProject,
  });

  const setTeam = useSetRecoilState(teamAtom);

  useEffect(() => {
    const assetsData: Record<string, User> | undefined = data?.team.reduce((acc, item) => {
      return { ...acc, [item.userId]: { ...item } };
    }, {});
    setTeam(assetsData);
  }, [data, setTeam]);
};
