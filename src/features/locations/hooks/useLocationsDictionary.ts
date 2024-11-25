import { useEffect } from "react";
import { useTimeriseQuery } from "features/api/hooks/useTimeriseQuery";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { LOCATIONS } from "../api/locations";
import { LocationsQueryResult, LocationsQueryVariables } from "../api/models";
import { Location } from "../model/location";
import { locationsDictionaryAtom } from "../state/locationsDictionaryAtom";

export const useLocationsDictionary = () => {
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const { data } = useTimeriseQuery<LocationsQueryResult, LocationsQueryVariables>({
    query: LOCATIONS,
    loader: "LOCATIONS",
    variables: { query: "", projectId: selectedProject ?? "" },
    skip: !selectedProject,
    trigger: "LOCATIONS",
  });

  const setLocations = useSetRecoilState(locationsDictionaryAtom);

  useEffect(() => {
    const locationsData: Record<string, Location> | undefined = data?.locations.reduce((acc, item) => {
      return { ...acc, [item.locationId]: { ...item } };
    }, {});
    setLocations(locationsData);
  }, [data, setLocations]);
};
