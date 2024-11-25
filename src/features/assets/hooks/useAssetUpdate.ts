import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { AssetMutationResult, AssetMutationVariables, UPDATE_ASSET } from "../api/mutations/updateAsset";

export const useAssetUpdate = () => {
  const { mutation, data } = useTimeriseMutation<AssetMutationResult, AssetMutationVariables>({
    mutation: UPDATE_ASSET,
    loader: "UPDATE_ASSET",
    trigger: "ASSETS",
    successToast: { variant: "SUCCESS", type: "data-save", date: 0 },
    failToast: { variant: "ERROR", type: "data-save", date: 0 },
  });

  return {
    mutation: (values: AssetMutationVariables) => {
      mutation(values);
    },
    data,
  };
};
