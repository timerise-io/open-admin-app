import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { DELETE_TEAM_MEMBER, TeamMemberDeleteMutationVariables } from "../api/mutations/deleteTeamMember";

interface TeamMemberDeleteProps {
  successCallback: () => void;
}

export const useTeamMemberDelete = ({ successCallback }: TeamMemberDeleteProps) => {
  const { mutation, data, loading, error } = useTimeriseMutation<any, TeamMemberDeleteMutationVariables>({
    mutation: DELETE_TEAM_MEMBER,
    loader: "TEAM_MEMBER",
    trigger: "TEAM_MEMBERS",
    successCallback,
    successToast: { variant: "SUCCESS", type: "team-member-deleted", date: 0 },
    failToast: { variant: "ERROR", type: "data-save", date: 0 },
  });

  return {
    mutation: (variables: TeamMemberDeleteMutationVariables) => {
      mutation(variables);
    },
    data,
    loading,
    error,
  };
};
