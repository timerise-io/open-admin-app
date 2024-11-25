import { gql } from "@apollo/client";

export const SERVICE_DAY_RANGE_STRATEGY_UPDATE = gql`
  mutation ServiceDayRangeStrategyUpdate(
    $projectId: ID!
    $serviceId: ID!
    $strategyId: ID!
    $start: StrategyStartInput
    $end: StrategyEndInput
    $daysOfWeek: [DayOfWeek!]
    $months: [Months!]
    $slotQuantity: NonNegativeInt
    $labels: [NonEmptyString]
  ) {
    serviceDayRangeStrategyUpdate(
      projectId: $projectId
      serviceId: $serviceId
      strategyId: $strategyId
      start: $start
      end: $end
      daysOfWeek: $daysOfWeek
      months: $months
      slotQuantity: $slotQuantity
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
      daysLimit
      labels
      createdAt
      updatedAt
    }
  }
`;
