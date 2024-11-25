import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { DELETE_SERVICE, DeleteServiceMutationVariables } from "../api/mutations/deleteService";

interface ServiceDeleteProps {
  successCallback: () => void;
}

export const useServiceDelete = ({ successCallback }: ServiceDeleteProps) => {
  const { mutation: deleteServiceMutation, data } = useTimeriseMutation<any, DeleteServiceMutationVariables>({
    mutation: DELETE_SERVICE,
    loader: "DELETE_SERVICE",
    trigger: "SERVICES",
    successCallback,
    successToast: { variant: "SUCCESS", type: "data-save", date: 0 },
    failToast: { variant: "ERROR", type: "data-save", date: 0 },
  });

  return {
    mutation: (variables: DeleteServiceMutationVariables) => {
      deleteServiceMutation(variables);
    },
    data,
  };
};
