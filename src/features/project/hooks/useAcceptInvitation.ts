import { useState } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import {
  ACCEPT_INVITATION,
  AcceptInvitationMutationResult,
  AcceptInvitationMutationVariables,
} from "../api/mutations/acceptInvitation";

export const useAcceptInvitation = () => {
  const { mutation, data } = useTimeriseMutation<AcceptInvitationMutationResult, AcceptInvitationMutationVariables>({
    mutation: ACCEPT_INVITATION,
    loader: "ACCEPT_INVITATION",
    trigger: "PROJECTS",
    successToast: { variant: "SUCCESS", type: "data-save", date: 0 },
    failToast: { variant: "ERROR", type: "data-save", date: 0 },
  });
  const [variables, setVariables] = useState<AcceptInvitationMutationVariables | null>(null);

  return {
    mutation: (variables: AcceptInvitationMutationVariables) => {
      mutation(variables);
      setVariables(variables);
    },
    data,
    variables,
  };
};
