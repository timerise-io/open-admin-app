import { gql } from "@apollo/client";

export const SERVICE_PERIODICITY_STRATEGY_CREATE = gql`
  mutation ServicePeriodicityStrategyCreate(
    $projectId: ID!,
    $serviceId: ID!,
    $start: StrategyStartInput!,
    $end: StrategyEndInput!,
    $tendency: [StrategyPeriodicityTendency!]!,
    $slotQuantity: NonNegativeInt!,
    $slotDuration: Duration!,
    $daysOfWeek: [DayOfWeek!],
    $months: [Months!],
    $slotInterval: Duration,
    $labels: [NonEmptyString]
  ) {
    servicePeriodicityStrategyCreate(
      projectId: $projectId,
      serviceId: $serviceId,
      start: $start,
      end: $end,
      tendency: $tendency,
      slotQuantity: $slotQuantity,
      slotDuration: $slotDuration,
      daysOfWeek: $daysOfWeek,
      months: $months,
      slotInterval: $slotInterval,
      labels: $labels
    ) {
      projectId
      serviceId
      strategyId
      start {
        
      }
      end {
        
      }
      daysOfWeek
      months
      tendency
      slotType
      slotQuantity
      slotDuration
      slotInterval
      slotsLimit
      labels
      createdAt
      updatedAt
    }
  }
`;
