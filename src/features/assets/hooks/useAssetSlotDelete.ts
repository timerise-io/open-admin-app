import { useEffect, useState } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { useRecoilState } from "recoil";
import { AssetSlotsDeleteMutationVariables, DELETE_ASSET_SLOT } from "../api/mutations/deleteAssetSlot";
import { selectedAssetsExceptionsAtom } from "../state/selectedAssetExceptionsAtom";

export const useAssetSlotDelete = () => {
  const [slotId, setSlotId] = useState("");

  const { mutation, data, error, loading } = useTimeriseMutation<any, AssetSlotsDeleteMutationVariables>({
    mutation: DELETE_ASSET_SLOT,
    loader: "DELETE_ASSET_SLOT",
  });

  const [exceptions, setExceptions] = useRecoilState(selectedAssetsExceptionsAtom);

  useEffect(() => {
    if (!error && !loading && slotId) {
      const newData = exceptions.filter((item) => item.slotId !== slotId);

      setExceptions([...newData]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading]);

  return {
    mutation: (values: AssetSlotsDeleteMutationVariables) => {
      setSlotId(values.slotId);
      mutation(values);
    },
    data,
  };
};
