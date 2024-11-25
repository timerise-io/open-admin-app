import { useState } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import {
  REJECT_INVITATION,
  RejectInvitationMutationResult,
  RejectInvitationMutationVariables,
} from "../api/mutations/rejectInvitation";

export const useRejectInvitation = () => {
  const { mutation, data } = useTimeriseMutation<RejectInvitationMutationResult, RejectInvitationMutationVariables>({
    mutation: REJECT_INVITATION,
    loader: "REJECT_INVITATION",
    trigger: "PROJECTS",
    successToast: { variant: "SUCCESS", type: "data-save", date: 0 },
    failToast: { variant: "ERROR", type: "data-save", date: 0 },
  });
  const [variables, setVariables] = useState<RejectInvitationMutationVariables | null>(null);

  return {
    mutation: (variables: RejectInvitationMutationVariables) => {
      mutation(variables);
      setVariables(variables);
    },
    data,
    variables,
  };
};
