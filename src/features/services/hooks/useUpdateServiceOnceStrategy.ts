import { useEffect } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { useRecoilState } from "recoil";
import { ServiceOnceStrategyUpdateResult, ServiceOnceStrategyUpdateVariables } from "../api/mutations/models";
import { SERVICE_ONCE_STRATEGY_UPDATE } from "../api/mutations/updateOnceServiceStrategy copy";
import { selectedStrategiesAtom } from "../state/selectedStrategiesAtom";

export const useUpdateServiceOnceStrategy = () => {
  const { mutation, data, error, loading } = useTimeriseMutation<
    ServiceOnceStrategyUpdateResult,
    ServiceOnceStrategyUpdateVariables
  >({
    mutation: SERVICE_ONCE_STRATEGY_UPDATE,
    loader: "UPDATE_SERVICE_STRATEGY",
  });

  const [strategies, setStrategies] = useRecoilState(selectedStrategiesAtom);

  useEffect(() => {
    if (!error && !loading && data?.serviceOnceStrategyUpdate.strategyId) {
      const newStrategies = strategies.map((item) =>
        item.strategyId !== data.serviceOnceStrategyUpdate.strategyId ? item : { ...data.serviceOnceStrategyUpdate },
      );

      setStrategies([...newStrategies]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading]);

  return {
    mutation: (values: ServiceOnceStrategyUpdateVariables) => {
      mutation(values);
    },
    data,
  };
};
