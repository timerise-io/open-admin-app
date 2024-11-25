import { gql } from "@apollo/client";

export const SERVICE_ONCE_STRATEGY_UPDATE = gql`
  mutation ServiceOnceStrategyUpdate(
    $projectId: ID!
    $serviceId: ID!
    $strategyId: ID!
    $start: DateTime
    $end: DateTime
    $slotQuantity: NonNegativeInt
    $labels: [NonEmptyString]
  ) {
    serviceOnceStrategyUpdate(
      projectId: $projectId
      serviceId: $serviceId
      strategyId: $strategyId
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
