import { useEffect, useState } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { useRecoilState } from "recoil";
import { DELETE_ONCE_SERVICE_STRATEGY } from "../api/mutations/deleteOnceServiceStrategy";
import { ServiceOnceStrategyDeleteVariables } from "../api/mutations/models";
import { selectedStrategiesAtom } from "../state/selectedStrategiesAtom";

export const useDeleteServiceOnceStrategy = () => {
  const [strategyId, setStrategyId] = useState("");

  const { mutation, data, error, loading } = useTimeriseMutation<any, ServiceOnceStrategyDeleteVariables>({
    mutation: DELETE_ONCE_SERVICE_STRATEGY,
    loader: "DELETE_SERVICE_STRATEGY",
  });

  const [strategies, setStrategies] = useRecoilState(selectedStrategiesAtom);

  useEffect(() => {
    if (!error && !loading && strategyId) {
      const newStrategies = strategies.filter((item) => item.strategyId !== strategyId);

      setStrategies([...newStrategies]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading]);

  return {
    mutation: (values: ServiceOnceStrategyDeleteVariables) => {
      setStrategyId(values.strategyId);
      mutation(values);
    },
    data,
  };
};
