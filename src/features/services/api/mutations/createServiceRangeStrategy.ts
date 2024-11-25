import { gql } from "@apollo/client";

// DAYS
export const SERVICE_RANGE_STRATEGY_CREATE = gql`
  mutation ServiceRangeStrategyCreate(
    $projectId: ID!
    $serviceId: ID!
    $start: StrategyStartInput!
    $end: StrategyEndInput!
    $slotQuantity: NonNegativeInt!
    $slotDuration: Duration!
    $daysOfWeek: [DayOfWeek!]
    $months: [Months!]
    $slotInterval: Duration!
    $labels: [NonEmptyString]
  ) {
    serviceRangeStrategyCreate(
      projectId: $projectId
      serviceId: $serviceId
      start: $start
      end: $end
      slotQuantity: $slotQuantity
      slotDuration: $slotDuration
      daysOfWeek: $daysOfWeek
      months: $months
      slotInterval: $slotInterval
      labels: $labels
    ) {
      projectId
      serviceId
      strategyId
      start {
        dateTime
        time
        timeOffset
      }
      end {
        dateTime
        time
        timePeriod
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
