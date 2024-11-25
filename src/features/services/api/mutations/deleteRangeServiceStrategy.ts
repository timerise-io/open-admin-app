import { gql } from "@apollo/client";

export const DELETE_RANGE_SERVICE_STRATEGY = gql`
  mutation ServiceRangeStrategyDelete($projectId: ID!, $serviceId: ID!, $strategyId: ID!) {
    serviceRangeStrategyDelete(projectId: $projectId, serviceId: $serviceId, strategyId: $strategyId)
  }
`;
