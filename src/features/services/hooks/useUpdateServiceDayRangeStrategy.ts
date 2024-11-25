import { useEffect } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { useRecoilState } from "recoil";
import { ServiceDayRangeStrategyUpdateResult, ServiceDayRangeStrategyUpdateVariables } from "../api/mutations/models";
import { SERVICE_DAY_RANGE_STRATEGY_UPDATE } from "../api/mutations/updateDayRangeServiceStrategy";
import { selectedStrategiesAtom } from "../state/selectedStrategiesAtom";

export const useUpdateServiceDayRangeStrategy = () => {
  const { mutation, data, error, loading } = useTimeriseMutation<
    ServiceDayRangeStrategyUpdateResult,
    ServiceDayRangeStrategyUpdateVariables
  >({
    mutation: SERVICE_DAY_RANGE_STRATEGY_UPDATE,
    loader: "UPDATE_SERVICE_STRATEGY",
  });

  const [strategies, setStrategies] = useRecoilState(selectedStrategiesAtom);

  useEffect(() => {
    if (!error && !loading && data?.serviceDayRangeStrategyUpdate.strategyId) {
      const newStrategies = strategies.map((item) =>
        item.strategyId !== data.serviceDayRangeStrategyUpdate.strategyId
          ? item
          : { ...data.serviceDayRangeStrategyUpdate },
      );

      setStrategies([...newStrategies]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading]);

  return {
    mutation: (values: ServiceDayRangeStrategyUpdateVariables) => {
      mutation(values);
    },
    data,
  };
};
