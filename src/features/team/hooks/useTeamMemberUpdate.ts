import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import {
  UPDATE_TEAM_MEMBER,
  UpdateTeamMemberMutationResult,
  UpdateTeamMemberMutationVariables,
} from "../api/updateTeamMember";

export const useTeamMemberUpdate = () => {
  const {
    mutation: updateProjectMutation,
    data,
    loading,
    error,
  } = useTimeriseMutation<UpdateTeamMemberMutationResult, UpdateTeamMemberMutationVariables>({
    mutation: UPDATE_TEAM_MEMBER,
    loader: "TEAM_MEMBER",
    trigger: "TEAM_MEMBERS",
    successToast: { variant: "SUCCESS", type: "data-save", date: 0 },
    failToast: { variant: "ERROR", type: "data-save", date: 0 },
  });

  return {
    mutation: (variables: UpdateTeamMemberMutationVariables) => {
      updateProjectMutation(variables);
    },
    data,
    loading,
    error,
  };
};
