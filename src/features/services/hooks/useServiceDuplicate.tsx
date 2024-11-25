import { ROUTES } from "constans/routes";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { generatePath, useNavigate } from "react-router-dom";
import {
  DuplicateServiceMutationResult,
  DuplicateServiceMutationVariables,
  SERVICE_DUPLICATE,
} from "../api/mutations/dublicateService";

export const useServiceDuplicate = () => {
  const navigate = useNavigate();
  const { mutation: createServiceMutation, data } = useTimeriseMutation<
    DuplicateServiceMutationResult,
    DuplicateServiceMutationVariables
  >({
    mutation: SERVICE_DUPLICATE,
    loader: "SERVICE_DUPLICATE",
    trigger: "SERVICES",
    successCallback: (data) => {
      navigate(
        generatePath(ROUTES.service, {
          id: data.serviceDuplicate.serviceId,
        }),
      );
    },
  });

  return {
    mutation: (variables: DuplicateServiceMutationVariables) => {
      createServiceMutation(variables);
    },
    data,
  };
};
