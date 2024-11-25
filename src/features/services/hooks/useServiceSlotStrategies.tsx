import { useEffect } from "react";
import { useDefaultQueryOptions } from "features/api/hooks/useDefaultQueryOptions";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useQuery } from "@apollo/client";
import { SlotsServiceStrategiesQueryResult, SlotsServiceStrategiesQueryVariables } from "../api/queries/models";
import { SERVICE_SLOTS_STRATEGIES } from "../api/queries/serviceSlotsStrategies";
import { selectedStrategiesAtom } from "../state/selectedStrategiesAtom";

export const useServiceSlotsStrategies = (serviceId: string) => {
  const queryOptions = useDefaultQueryOptions<SlotsServiceStrategiesQueryVariables>();
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const { data } = useQuery<SlotsServiceStrategiesQueryResult, SlotsServiceStrategiesQueryVariables>(
    SERVICE_SLOTS_STRATEGIES,
    {
      ...queryOptions,
      variables: { serviceId, projectId: selectedProject ?? "" },
      skip: serviceId === "" || selectedProject === undefined,
    },
  );
  const setSelectedStrategies = useSetRecoilState(selectedStrategiesAtom);

  useEffect(() => {
    const newData = data?.serviceSlotsStrategies && [...data.serviceSlotsStrategies];

    setSelectedStrategies(newData ?? []);

    return () => {
      setSelectedStrategies([]);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setSelectedStrategies]);
};
