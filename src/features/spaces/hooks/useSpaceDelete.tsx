import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { DELETE_SPACE, DeleteSpaceMutationVariables } from "../api/mutations/deleteSpace";

interface SpaceDeleteProps {
  successCallback: () => void;
}

export const useSpaceDelete = ({ successCallback }: SpaceDeleteProps) => {
  const { mutation: deleteMutation, data } = useTimeriseMutation<any, DeleteSpaceMutationVariables>({
    mutation: DELETE_SPACE,
    loader: "DELETE_SPACE",
    trigger: "SPACES",
    successCallback,
    successToast: { variant: "SUCCESS", type: "data-save", date: 0 },
    failToast: { variant: "ERROR", type: "data-save", date: 0 },
  });

  return {
    mutation: (variables: DeleteSpaceMutationVariables) => {
      deleteMutation(variables);
    },
    data,
  };
};
