import { useEffect } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { useToast } from "features/toast/hooks/useToast";
import { CREATE_SERVICE } from "../api/mutations/createService";
import { CreateServiceMutationResult, CreateServiceMutationVariables } from "../api/mutations/models";

export const useServiceCreate = () => {
  const showToast = useToast();

  const {
    mutation: createServiceMutation,
    data,
    loading,
    error,
  } = useTimeriseMutation<CreateServiceMutationResult, CreateServiceMutationVariables>({
    mutation: CREATE_SERVICE,
    loader: "CREATE_SERVICE",
    trigger: "SERVICES",
  });

  useEffect(() => {
    if (loading) return;

    if (error) {
      showToast({ variant: "ERROR", type: "data-save", date: 0 });
    } else if (data) {
      showToast({ variant: "SUCCESS", type: "data-save", date: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, loading]);

  return {
    mutation: (variables: CreateServiceMutationVariables) => {
      createServiceMutation(variables);
    },
    data,
  };
};
