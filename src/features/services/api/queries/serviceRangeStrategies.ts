import { gql } from "@apollo/client";

export const SERVICE_RANGE_STRATEGIES = gql`
  query ServiceRangeStrategies($projectId: ID!, $serviceId: ID!) {
    serviceRangeStrategies(projectId: $projectId, serviceId: $serviceId) {
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
