import { gql } from "@apollo/client";

export const SERVICE_RANGE_STRATEGY_UPDATE = gql`
  mutation ServiceRangeStrategyUpdate(
    $projectId: ID!
    $serviceId: ID!
    $strategyId: ID!
    $start: StrategyStartInput
    $end: StrategyEndInput
    $daysOfWeek: [DayOfWeek!]
    $months: [Months!]
    $slotDuration: Duration
    $slotQuantity: NonNegativeInt
    $slotInterval: Duration
    $labels: [NonEmptyString]
  ) {
    serviceRangeStrategyUpdate(
      projectId: $projectId
      serviceId: $serviceId
      strategyId: $strategyId
      start: $start
      end: $end
      daysOfWeek: $daysOfWeek
      months: $months
      slotDuration: $slotDuration
      slotQuantity: $slotQuantity
      slotInterval: $slotInterval
      labels: $labels
    ) {
      projectId
      serviceId
      strategyId
      start {
        dateTime
        timeOffset
        time
      }
      end {
        dateTime
        timePeriod
        time
      }
      daysOfWeek
      months
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
