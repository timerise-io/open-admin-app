import { gql } from "@apollo/client";

export const SERVICE_ONCE_STRATEGIES = gql`
  query ServiceOnceStrategies($projectId: ID!, $serviceId: ID!) {
    serviceOnceStrategies(projectId: $projectId, serviceId: $serviceId) {
      projectId
      serviceId
      strategyId
      start
      end
      slotType
      slotQuantity
      slotDuration
      labels
      createdAt
      updatedAt
    }
  }
`;
