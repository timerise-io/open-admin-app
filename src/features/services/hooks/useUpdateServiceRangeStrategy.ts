import { useEffect } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { useRecoilState } from "recoil";
import { ServiceRangeStrategyUpdateResult, ServiceRangeStrategyUpdateVariables } from "../api/mutations/models";
import { SERVICE_RANGE_STRATEGY_UPDATE } from "../api/mutations/updateRangeServiceStrategy";
import { selectedStrategiesAtom } from "../state/selectedStrategiesAtom";

export const useUpdateServiceRangeStrategy = () => {
  const { mutation, data, error, loading } = useTimeriseMutation<
    ServiceRangeStrategyUpdateResult,
    ServiceRangeStrategyUpdateVariables
  >({
    mutation: SERVICE_RANGE_STRATEGY_UPDATE,
    loader: "UPDATE_SERVICE_STRATEGY",
  });

  const [strategies, setStrategies] = useRecoilState(selectedStrategiesAtom);

  useEffect(() => {
    if (!error && !loading && data?.serviceRangeStrategyUpdate.strategyId) {
      const newStrategies = strategies.map((item) =>
        item.strategyId !== data.serviceRangeStrategyUpdate.strategyId ? item : { ...data.serviceRangeStrategyUpdate },
      );

      setStrategies([...newStrategies]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading]);

  return {
    mutation: (values: ServiceRangeStrategyUpdateVariables) => {
      mutation(values);
    },
    data,
  };
};
