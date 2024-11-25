import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { UPDATE_SPACE, UpdateSpaceMutationResult, UpdateSpaceMutationVariables } from "../api/mutations/updateSpace";

export const useSpaceUpdate = () => {
  const {
    mutation: updateSpaceMutation,
    data,
    loading,
    error,
  } = useTimeriseMutation<UpdateSpaceMutationResult, UpdateSpaceMutationVariables>({
    mutation: UPDATE_SPACE,
    loader: "UPDATE_SPACE",
    trigger: "SPACES",
    successToast: { variant: "SUCCESS", type: "data-save", date: 0 },
    failToast: { variant: "ERROR", type: "data-save", date: 0 },
  });

  return {
    mutation: (variables: UpdateSpaceMutationVariables) => {
      updateSpaceMutation(variables);
    },
    data,
    loading,
    error,
  };
};
