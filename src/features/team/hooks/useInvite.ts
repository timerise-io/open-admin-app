import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { INVITE, TeamMemberInviteMutationResult, TeamMemberInviteMutationVariables } from "../api/teamMemberInvite";

export const useInvite = () => {
  const { mutation, data } = useTimeriseMutation<TeamMemberInviteMutationResult, TeamMemberInviteMutationVariables>({
    mutation: INVITE,
    loader: "INVITE",
    trigger: "INVITATIONS",
  });

  return {
    mutation: (values: TeamMemberInviteMutationVariables) => {
      mutation(values);
    },
    data,
  };
};
