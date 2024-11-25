import { gql } from "@apollo/client";

export const SERVICE_SLOT_STRATEGY_CREATE = gql`
  mutation ServiceSlotStrategyCreate(
    $projectId: ID!
    $serviceId: ID!
    $slotType: SlotType!
    $slotQuantity: NonNegativeInt!
    $slotDuration: Duration!
    $slotInterval: Duration
    $strategyType: StrategyType!
    $discontinueStrategy: DiscontinueStrategyInput
    $daysOfWeek: [DayOfWeek!]
    $timeFrom: Time
    $timeTo: Time
    $startDateTime: DateTime
    $slotDateTime: DateTime
  ) {
    serviceSlotStrategyCreate(
      projectId: $projectId
      serviceId: $serviceId
      slotType: $slotType
      slotQuantity: $slotQuantity
      slotDuration: $slotDuration
      slotInterval: $slotInterval
      strategyType: $strategyType
      discontinueStrategy: $discontinueStrategy
      daysOfWeek: $daysOfWeek
      timeFrom: $timeFrom
      timeTo: $timeTo
      startDateTime: $startDateTime
      slotDateTime: $slotDateTime
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
