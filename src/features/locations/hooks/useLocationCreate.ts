import { useEffect } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { useRecoilState } from "recoil";
import {
  CREATE_LOCATION,
  LocationCreateMutationResult,
  LocationCreateMutationVariables,
} from "../api/mutations/createLocation";
import { locationsDictionaryAtom } from "../state/locationsDictionaryAtom";

export const useLocationCreate = () => {
  const { mutation, data, error, loading } = useTimeriseMutation<
    LocationCreateMutationResult,
    LocationCreateMutationVariables
  >({
    mutation: CREATE_LOCATION,
    loader: "CREATE_LOCATION",
    trigger: "LOCATIONS",
  });

  const [locations, setLocations] = useRecoilState(locationsDictionaryAtom);

  useEffect(() => {
    if (!error && !loading && data?.locationCreate.locationId) {
      setLocations({
        ...locations,
        [data.locationCreate.locationId]: { ...data.locationCreate },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading]);

  return {
    mutation: (values: LocationCreateMutationVariables) => {
      mutation(values);
    },
    data,
  };
};
