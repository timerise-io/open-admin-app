import { useEffect } from "react";
import { useTimeriseQuery } from "features/api/hooks/useTimeriseQuery";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { LOCATION_SLOTS, LocationSlotQueryResult, LocationSlotsQueryVariables } from "../api/queries/locationsSlots";
import { selectedLocationExceptionsAtom } from "../state/selectedAssetExceptionsAtom";

export const useLocationExceptions = (locationId: string) => {
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const { data } = useTimeriseQuery<LocationSlotQueryResult, LocationSlotsQueryVariables>({
    query: LOCATION_SLOTS,
    loader: "LOCATION_SLOTS",
    variables: {
      locationId,
      slotType: "EXCEPTION",
      projectId: selectedProject ?? "",
    },
    skip: locationId === "" || selectedProject === undefined,
  });

  const setExceptions = useSetRecoilState(selectedLocationExceptionsAtom);

  useEffect(() => {
    const newData = data?.location.slots && [...data.location.slots];

    setExceptions(newData ?? []);

    return () => {
      setExceptions([]);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setExceptions]);
};
