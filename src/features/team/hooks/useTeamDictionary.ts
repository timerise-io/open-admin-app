import { useEffect } from "react";
import { useDefaultQueryOptions } from "features/api/hooks/useDefaultQueryOptions";
import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useQuery } from "@apollo/client";
import { TeamQueryResult, TeamQueryVariables } from "../api/models";
import { TEAM } from "../api/team";
import { User } from "../models/user";
import { teamDictionaryAtom } from "../state/teamDictionaryAtom";

export const useTeamDictionary = () => {
  const setApiState = useSetRecoilState(apiStatusAtom("GET_TEAM"));
  const queryOptions = useDefaultQueryOptions<TeamQueryVariables>();
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const { data, loading } = useQuery<TeamQueryResult, TeamQueryVariables>(TEAM, {
    ...queryOptions,
    variables: { projectId: selectedProject ?? "" },
    skip: !selectedProject,
  });
  const setTeam = useSetRecoilState(teamDictionaryAtom);

  useEffect(() => {
    setApiState({ isLoading: loading });
  }, [loading, setApiState]);

  useEffect(() => {
    const assetsData: Record<string, User> | undefined = data?.team.reduce((acc, item) => {
      return { ...acc, [item.userId]: { ...item } };
    }, {});
    setTeam(assetsData);
  }, [data, setTeam]);
};
