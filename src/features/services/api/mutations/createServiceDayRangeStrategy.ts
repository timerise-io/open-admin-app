import { gql } from "@apollo/client";

export const SERVICE_DAY_RANGE_STRATEGY_CREATE = gql`
  mutation ServiceDayRangeStrategyCreate(
    $projectId: ID!
    $serviceId: ID!
    $start: StrategyStartInput!
    $end: StrategyEndInput!
    $slotQuantity: NonNegativeInt!
    $daysOfWeek: [DayOfWeek!]
    $months: [Months!]
    $labels: [NonEmptyString]
  ) {
    serviceDayRangeStrategyCreate(
      projectId: $projectId
      serviceId: $serviceId
      start: $start
      end: $end
      slotQuantity: $slotQuantity
      daysOfWeek: $daysOfWeek
      months: $months
      labels: $labels
    ) {
      createdAt
      daysLimit
      daysOfWeek
      end {
        dateTime
        time
        timePeriod
      }
      labels
      months
      projectId
      serviceId
      slotDuration
      slotQuantity
      slotType
      start {
        dateTime
        time
        timeOffset
      }
      strategyId
      updatedAt
    }
  }
`;
