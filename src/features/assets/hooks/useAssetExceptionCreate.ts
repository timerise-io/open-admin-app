import { useEffect } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { useRecoilState } from "recoil";
import {
  AssetSlotCreateMutationResult,
  AssetSlotsCreateMutationVariables,
  CREATE_ASSET_SLOT,
} from "../api/mutations/createAssetSlot";
import { selectedAssetsExceptionsAtom } from "../state/selectedAssetExceptionsAtom";

export const useAssetExceptionCreate = () => {
  const { mutation, data, error, loading } = useTimeriseMutation<
    AssetSlotCreateMutationResult,
    AssetSlotsCreateMutationVariables
  >({ mutation: CREATE_ASSET_SLOT, loader: "CREATE_ASSET_SLOT" });

  const [exceptions, setExceptions] = useRecoilState(selectedAssetsExceptionsAtom);

  useEffect(() => {
    if (!error && !loading && data?.assetSlotCreate) {
      setExceptions([...exceptions, { ...data.assetSlotCreate }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading]);

  return {
    mutation: (values: AssetSlotsCreateMutationVariables) => {
      // setStrategyId(values.strategyId);
      mutation(values);
    },
    data,
  };
};
