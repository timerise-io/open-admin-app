import { ROUTES } from "constans/routes";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { generatePath, useNavigate } from "react-router-dom";
import {
  DuplicateLocationMutationResult,
  DuplicateLocationMutationVariables,
  LOCATION_DUPLICATE,
} from "../api/mutations/dublicateLocation";

export const useLocationDuplicate = () => {
  const navigate = useNavigate();
  const { mutation: createLocationMutation, data } = useTimeriseMutation<
    DuplicateLocationMutationResult,
    DuplicateLocationMutationVariables
  >({
    mutation: LOCATION_DUPLICATE,
    loader: "LOCATION_DUPLICATE",
    trigger: "LOCATIONS",
    successCallback: (data) => {
      navigate(
        generatePath(ROUTES.location, {
          id: data.locationDuplicate.locationId,
        }),
      );
    },
  });

  return {
    mutation: (variables: DuplicateLocationMutationVariables) => {
      createLocationMutation(variables);
    },
    data,
  };
};
