import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { DELETE_TEAM_MEMBER_SLOT, TeamMemberSlotDeleteMutationVariables } from "../api/mutations/deleteTeamMemberSlot";

export const useTeamMemberSlotDelete = () => {
  const { mutation, data } = useTimeriseMutation<any, TeamMemberSlotDeleteMutationVariables>({
    mutation: DELETE_TEAM_MEMBER_SLOT,
    loader: "TEAM_MEMBER_SLOTS",
    trigger: "TEAM_MEMBER_SLOTS",
  });

  return {
    mutation: (values: TeamMemberSlotDeleteMutationVariables) => {
      mutation(values);
    },
    data,
  };
};
