import { useEffect, useState } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { useRecoilState } from "recoil";
import { DELETE_LOCATION_SLOT, LocationSlotsDeleteMutationVariables } from "../api/mutations/deleteLocationSlot";
import { selectedLocationExceptionsAtom } from "../state/selectedAssetExceptionsAtom";

export const useLocationSlotDelete = () => {
  const [slotId, setSlotId] = useState("");

  const { mutation, data, error, loading } = useTimeriseMutation<any, LocationSlotsDeleteMutationVariables>({
    mutation: DELETE_LOCATION_SLOT,
    loader: "DELETE_LOCATION_SLOT",
  });

  const [exceptions, setExceptions] = useRecoilState(selectedLocationExceptionsAtom);

  useEffect(() => {
    if (!error && !loading && slotId) {
      const newData = exceptions.filter((item) => item.slotId !== slotId);

      setExceptions([...newData]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading]);

  return {
    mutation: (values: LocationSlotsDeleteMutationVariables) => {
      setSlotId(values.slotId);
      mutation(values);
    },
    data,
  };
};
