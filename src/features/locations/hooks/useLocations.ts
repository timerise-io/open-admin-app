import { useEffect } from "react";
import { useTimeriseQuery } from "features/api/hooks/useTimeriseQuery";
import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { LOCATIONS } from "../api/locations";
import { LocationsQueryResult, LocationsQueryVariables } from "../api/models";
import { Location } from "../model/location";
import { locationsAtom } from "../state/locationsAtom";
import { locationsFilterSelector } from "../state/locationsFilterAtom";

export const useLocations = () => {
  const filters = useRecoilValue(locationsFilterSelector);
  const setApiState = useSetRecoilState(apiStatusAtom("GET_LOCATIONS"));
  const selectedProject = useRecoilValue(selectedProjectAtom);

  const { data, loading } = useTimeriseQuery<LocationsQueryResult, LocationsQueryVariables>({
    query: LOCATIONS,
    loader: "LOCATIONS",
    variables: { query: filters.text, projectId: selectedProject ?? "" },
    skip: !selectedProject,
    trigger: "LOCATIONS",
  });

  const setLocations = useSetRecoilState(locationsAtom);

  useEffect(() => {
    setApiState({ isLoading: loading });
  }, [loading, setApiState]);

  useEffect(() => {
    const locationsData: Record<string, Location> | undefined = data?.locations.reduce((acc, item) => {
      return { ...acc, [item.locationId]: { ...item } };
    }, {});
    setLocations(locationsData);
  }, [data, setLocations]);
};
