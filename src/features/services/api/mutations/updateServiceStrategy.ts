import { gql } from "@apollo/client";

export const SERVICE_SLOT_STRATEGY_UPDATE = gql`
  mutation ServiceSlotStrategyUpdate(
    $projectId: ID!
    $serviceId: ID!
    $strategyId: ID!
    $strategyType: StrategyType!
    $timeTo: Time
    $timeFrom: Time
    $slotType: SlotType
    $slotDateTime: DateTime
    $slotQuantity: NonNegativeInt
    $slotDuration: Duration
    $slotInterval: Duration
    $discontinueStrategy: DiscontinueStrategyInput
    $daysOfWeek: [DayOfWeek!]
    $startDateTime: DateTime
  ) {
    serviceSlotStrategyUpdate(
      projectId: $projectId
      serviceId: $serviceId
      strategyId: $strategyId
      strategyType: $strategyType
      timeTo: $timeTo
      timeFrom: $timeFrom
      slotType: $slotType
      slotDateTime: $slotDateTime
      slotQuantity: $slotQuantity
      slotDuration: $slotDuration
      slotInterval: $slotInterval
      discontinueStrategy: $discontinueStrategy
      daysOfWeek: $daysOfWeek
      startDateTime: $startDateTime
    ) {
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
        discontinueType
        endDateTime
        futurePeriod
      }
      serviceId
      projectId
      startDateTime
      slotDateTime
    }
  }
`;
