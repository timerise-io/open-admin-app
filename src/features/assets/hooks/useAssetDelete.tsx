import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { DELETE_ASSET, DeleteAssetMutationVariables } from "../api/mutations/deleteAsset";

interface AssetDeleteProps {
  successCallback: () => void;
}

export const useAssetDelete = ({ successCallback }: AssetDeleteProps) => {
  const { mutation: deleteMutation, data } = useTimeriseMutation<any, DeleteAssetMutationVariables>({
    mutation: DELETE_ASSET,
    loader: "DELETE_ASSET",
    trigger: "ASSETS",
    successCallback,
    successToast: { variant: "SUCCESS", type: "data-save", date: 0 },
    failToast: { variant: "ERROR", type: "data-save", date: 0 },
  });

  return {
    mutation: (variables: DeleteAssetMutationVariables) => {
      deleteMutation(variables);
    },
    data,
  };
};
