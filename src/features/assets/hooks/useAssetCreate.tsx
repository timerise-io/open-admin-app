import { useEffect } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { useRecoilState } from "recoil";
import { AssetCreateMutationResult, AssetCreateMutationVariables, CREATE_ASSET } from "../api/mutations/createAsset";
import { assetsDictionaryAtom } from "../state/assetsDictionaryAtom";

export const useAssetCreate = () => {
  const { mutation, data, error, loading } = useTimeriseMutation<
    AssetCreateMutationResult,
    AssetCreateMutationVariables
  >({ mutation: CREATE_ASSET, loader: "CREATE_ASSET", trigger: "ASSETS" });

  const [assetDictionary, setAssetDictionary] = useRecoilState(assetsDictionaryAtom);

  useEffect(() => {
    if (data && !loading && !error && data.assetCreate) {
      setAssetDictionary({
        ...assetDictionary,
        [data.assetCreate.assetId]: { ...data.assetCreate },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, loading, setAssetDictionary]);

  return {
    mutation: (variables: AssetCreateMutationVariables) => {
      mutation(variables);
    },
    data,
  };
};
