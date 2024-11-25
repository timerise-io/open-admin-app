import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { DELETE_LOCATION, DeleteLocationMutationVariables } from "../api/mutations/deleteLocation";

interface LocationDeleteProps {
  successCallback: () => void;
}

export const useLocationDelete = ({ successCallback }: LocationDeleteProps) => {
  const { mutation: deleteMutation, data } = useTimeriseMutation<any, DeleteLocationMutationVariables>({
    mutation: DELETE_LOCATION,
    loader: "DELETE_LOCATION",
    trigger: "LOCATIONS",
    successCallback,
    successToast: { variant: "SUCCESS", type: "data-save", date: 0 },
    failToast: { variant: "ERROR", type: "data-save", date: 0 },
  });

  return {
    mutation: (variables: DeleteLocationMutationVariables) => {
      deleteMutation(variables);
    },
    data,
  };
};
