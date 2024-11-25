import { Slot, SlotType } from "features/services/model/serviceSlotStrategie";
import { gql } from "@apollo/client";

export interface LocationSlotsCreateMutationVariables {
  projectId: string;
  locationId: string;
  quantity: number;
  slotType: SlotType;
  dateTimeFrom: Date;
  dateTimeTo: Date;
}

export interface LocationSlotCreateMutationResult {
  locationSlotCreate: Slot;
}

export const CREATE_LOCATION_SLOT = gql`
  mutation LocationSlotCreate(
    $projectId: ID!
    $locationId: ID!
    $quantity: NonNegativeInt!
    $dateTimeFrom: DateTime!
    $dateTimeTo: DateTime!
    $slotType: SlotType!
  ) {
    locationSlotCreate(
      projectId: $projectId
      locationId: $locationId
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
