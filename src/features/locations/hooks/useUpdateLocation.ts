import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import {
  UPDATE_LOCATION,
  UpdateLocationMutationResult,
  UpdateLocationMutationVariables,
} from "../api/mutations/updateLocation";

export const useUpdateLocation = () => {
  const {
    mutation: updateLocationMutation,
    data,
    loading,
    error,
  } = useTimeriseMutation<UpdateLocationMutationResult, UpdateLocationMutationVariables>({
    mutation: UPDATE_LOCATION,
    loader: "UPDATE_LOCATION",
    trigger: "LOCATIONS",
    successToast: { variant: "SUCCESS", type: "data-save", date: 0 },
    failToast: { variant: "ERROR", type: "data-save", date: 0 },
  });

  return {
    mutation: (variables: UpdateLocationMutationVariables) => {
      updateLocationMutation(variables);
    },
    data,
    loading,
    error,
  };
};
