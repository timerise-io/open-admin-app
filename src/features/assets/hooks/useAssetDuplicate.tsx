import { ROUTES } from "constans/routes";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { generatePath, useNavigate } from "react-router-dom";
import {
  ASSET_DUPLICATE,
  DuplicateAssetMutationResult,
  DuplicateAssetMutationVariables,
} from "../api/mutations/dublicateAsset";

export const useAssetDuplicate = () => {
  const navigate = useNavigate();
  const { mutation: createAssetMutation, data } = useTimeriseMutation<
    DuplicateAssetMutationResult,
    DuplicateAssetMutationVariables
  >({
    mutation: ASSET_DUPLICATE,
    loader: "ASSET_DUPLICATE",
    trigger: "ASSETS",
    successCallback: (data) => {
      navigate(
        generatePath(ROUTES.asset, {
          id: data.assetDuplicate.assetId,
        }),
      );
    },
  });

  return {
    mutation: (variables: DuplicateAssetMutationVariables) => {
      createAssetMutation(variables);
    },
    data,
  };
};
