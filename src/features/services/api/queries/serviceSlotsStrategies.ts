import { gql } from "@apollo/client";

export const SERVICE_SLOTS_STRATEGIES = gql`
  query ServiceSlotsStrategies($projectId: ID!, $serviceId: ID!) {
    serviceSlotsStrategies(projectId: $projectId, serviceId: $serviceId) {
      strategyId
      strategyType
      timeFrom
      timeTo
      daysOfWeek
      slotType
      slotQuantity
      slotDuration
      slotInterval
      discontinueStrategy {
        endDateTime
        futurePeriod
        discontinueType
      }
      serviceId
      projectId
      startDateTime
      slotDateTime
    }
  }
`;
