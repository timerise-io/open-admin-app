import { gql } from "@apollo/client";

export const DELETE_DAY_RANGE_SERVICE_STRATEGY = gql`
  mutation ServiceDayRangeStrategyDelete($projectId: ID!, $serviceId: ID!, $strategyId: ID!) {
    serviceDayRangeStrategyDelete(projectId: $projectId, serviceId: $serviceId, strategyId: $strategyId)
  }
`;
