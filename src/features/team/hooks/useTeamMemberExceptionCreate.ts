import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import {
  CREATE_TEAM_MEMBER_SLOT,
  TeamMemberCreateMutationResult,
  TeamMemberCreateMutationVariables,
} from "../api/mutations/createTeamMemberSlot";

export const useTeamMemberExceptionCreate = () => {
  const { mutation, data } = useTimeriseMutation<TeamMemberCreateMutationResult, TeamMemberCreateMutationVariables>({
    mutation: CREATE_TEAM_MEMBER_SLOT,
    loader: "TEAM_MEMBER_SLOTS",
    trigger: "TEAM_MEMBER_SLOTS",
  });

  return {
    mutation: (values: TeamMemberCreateMutationVariables) => {
      mutation(values);
    },
    data,
  };
};
