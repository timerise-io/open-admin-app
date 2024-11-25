import { gql } from "@apollo/client";

export const CREATE_SLOT = gql`
  mutation ServiceSlotCreate(
    $projectId: ID!
    $serviceId: ID!
    $quantity: NonNegativeInt!
    $dateTimeFrom: DateTime!
    $dateTimeTo: DateTime!
    $slotType: SlotType!
  ) {
    serviceSlotCreate(
      projectId: $projectId
      serviceId: $serviceId
      quantity: $quantity
      dateTimeFrom: $dateTimeFrom
      dateTimeTo: $dateTimeTo
      slotType: $slotType
    ) {
      slotId
      slotType
      quantity
      dateTimeFrom
      dateTimeTo
      duration
    }
  }
`;
