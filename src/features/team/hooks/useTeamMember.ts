import { useEffect } from "react";
import { useDefaultQueryOptions } from "features/api/hooks/useDefaultQueryOptions";
import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useQuery } from "@apollo/client";
import { TeamMemberQueryResult, TeamMemberQueryVariables } from "../api/models";
import { TEAM_MEMBER } from "../api/teamMember";
import { User } from "../models/user";
import { selectedTeamMemberAtom } from "../state/selectedTeamMember";

export const useTeamMember = (userId: string) => {
  const setApiState = useSetRecoilState(apiStatusAtom("GET_TEAM_MEMBER"));
  const queryOptions = useDefaultQueryOptions<TeamMemberQueryVariables>();
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const { data, loading } = useQuery<TeamMemberQueryResult, TeamMemberQueryVariables>(TEAM_MEMBER, {
    ...queryOptions,
    variables: { projectId: selectedProject ?? "", userId },
    skip: !selectedProject,
  });
  const setTeamMember = useSetRecoilState(selectedTeamMemberAtom);

  useEffect(() => {
    setApiState({ isLoading: loading });
  }, [loading, setApiState]);

  useEffect(() => {
    const userData: User | undefined = data?.teamMember;
    setTeamMember(userData);
  }, [data, setTeamMember]);
};
