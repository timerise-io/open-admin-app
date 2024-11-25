import { gql } from "@apollo/client";

export const SERVICE_ONCE_STRATEGY_CREATE = gql`
  mutation ServiceOnceStrategyCreate(
    $projectId: ID!
    $serviceId: ID!
    $start: DateTime!
    $end: DateTime!
    $slotQuantity: NonNegativeInt!
    $labels: [NonEmptyString]
  ) {
    serviceOnceStrategyCreate(
      projectId: $projectId
      serviceId: $serviceId
      start: $start
      end: $end
      slotQuantity: $slotQuantity
      labels: $labels
    ) {
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
