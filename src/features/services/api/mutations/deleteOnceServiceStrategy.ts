import { gql } from "@apollo/client";

export const DELETE_ONCE_SERVICE_STRATEGY = gql`
  mutation ServiceOnceStrategyDelete($projectId: ID!, $serviceId: ID!, $strategyId: ID!) {
    serviceOnceStrategyDelete(projectId: $projectId, serviceId: $serviceId, strategyId: $strategyId)
  }
`;
