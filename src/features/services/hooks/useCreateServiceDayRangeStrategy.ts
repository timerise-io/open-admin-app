import { useEffect } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { useRecoilState } from "recoil";
import { SERVICE_DAY_RANGE_STRATEGY_CREATE } from "../api/mutations/createServiceDayRangeStrategy";
import {
  ServiceDayRangeStrategyCreateRangeResult,
  ServiceDayRangeStrategyCreateRangeVariables,
} from "../api/mutations/models";
import { ServiceDayRangeStrategy } from "../model/serviceSlotStrategie";
import { selectedStrategiesAtom } from "../state/selectedStrategiesAtom";

export const useCreateServiceDayRangeStrategy = () => {
  const { mutation, data, error, loading } = useTimeriseMutation<
    ServiceDayRangeStrategyCreateRangeResult,
    ServiceDayRangeStrategyCreateRangeVariables
  >({
    mutation: SERVICE_DAY_RANGE_STRATEGY_CREATE,
    loader: "CREATE_SERVICE_STRATEGY",
  });

  const [strategies, setStrategies] = useRecoilState(selectedStrategiesAtom);

  useEffect(() => {
    if (!error && !loading && data?.serviceDayRangeStrategyCreate) {
      setStrategies([...strategies, { ...data.serviceDayRangeStrategyCreate } as ServiceDayRangeStrategy]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { mutation, data };
};
