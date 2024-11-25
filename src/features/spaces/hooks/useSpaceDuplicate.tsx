import { ROUTES } from "constans/routes";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { generatePath, useNavigate } from "react-router-dom";
import {
  DuplicateSpaceMutationResult,
  DuplicateSpaceMutationVariables,
  SPACE_DUPLICATE,
} from "../api/mutations/dublicateSpace";

export const useSpaceDuplicate = () => {
  const navigate = useNavigate();
  const { mutation: createSpaceMutation, data } = useTimeriseMutation<
    DuplicateSpaceMutationResult,
    DuplicateSpaceMutationVariables
  >({
    mutation: SPACE_DUPLICATE,
    loader: "SPACE_DUPLICATE",
    trigger: "SPACES",
    successCallback: (data) => {
      navigate(
        generatePath(ROUTES.space, {
          id: data.spaceDuplicate.spaceId,
        }),
      );
    },
  });

  return {
    mutation: (variables: DuplicateSpaceMutationVariables) => {
      createSpaceMutation(variables);
    },
    data,
  };
};
