import { gql } from "@apollo/client";

export const SERVICE_DAY_RANGE_STRATEGIES = gql`
  query ServiceDayRangeStrategies($projectId: ID!, $serviceId: ID!) {
    serviceDayRangeStrategies(projectId: $projectId, serviceId: $serviceId) {
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
      daysLimit
      labels
      createdAt
      updatedAt
    }
  }
`;
