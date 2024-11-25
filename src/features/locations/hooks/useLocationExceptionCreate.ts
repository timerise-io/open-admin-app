import { useEffect } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { useRecoilState } from "recoil";
import {
  CREATE_LOCATION_SLOT,
  LocationSlotCreateMutationResult,
  LocationSlotsCreateMutationVariables,
} from "../api/mutations/createLocationSlot";
import { selectedLocationExceptionsAtom } from "../state/selectedAssetExceptionsAtom";

export const useLocationExceptionCreate = () => {
  const { mutation, data, error, loading } = useTimeriseMutation<
    LocationSlotCreateMutationResult,
    LocationSlotsCreateMutationVariables
  >({ mutation: CREATE_LOCATION_SLOT, loader: "CREATE_LOCATION_SLOT" });

  const [exceptions, setExceptions] = useRecoilState(selectedLocationExceptionsAtom);

  useEffect(() => {
    if (!error && !loading && data?.locationSlotCreate) {
      setExceptions([...exceptions, { ...data.locationSlotCreate }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading]);

  return {
    mutation: (values: LocationSlotsCreateMutationVariables) => {
      mutation(values);
    },
    data,
  };
};
