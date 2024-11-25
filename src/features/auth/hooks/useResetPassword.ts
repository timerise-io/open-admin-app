import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client/react/hooks/useMutation";
import { ResetPasswordMutationResult, ResetPasswordMutationVariables } from "../api/mutations/models";
import { RESET_PASSWORD } from "../api/mutations/resetPassword";

export const useResetPassword = () => {
  const [state, setState] = useState<"pending" | "done">("pending");

  const [resetPasswordMutation, { data, loading, error }] = useMutation<
    ResetPasswordMutationResult,
    ResetPasswordMutationVariables
  >(RESET_PASSWORD);

  useEffect(() => {
    if (data && !loading && !error) {
      setState("done");
    }
  }, [data, loading, error]);

  return { resetPasswordMutation, state };
};
