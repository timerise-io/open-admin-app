import { gql } from "@apollo/client";

export const DELETE_SERVICE_STRATEGY = gql`
  mutation ServiceSlotStrategyDelete($projectId: ID!, $serviceId: ID!, $strategyId: ID!) {
    serviceSlotStrategyDelete(projectId: $projectId, serviceId: $serviceId, strategyId: $strategyId)
  }
`;
