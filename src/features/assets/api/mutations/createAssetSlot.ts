import { Slot, SlotType } from "features/services/model/serviceSlotStrategie";
import { gql } from "@apollo/client";

export interface AssetSlotsCreateMutationVariables {
  projectId: string;
  assetId: string;
  quantity: number;
  slotType: SlotType;
  dateTimeFrom: Date;
  dateTimeTo: Date;
}

export interface AssetSlotCreateMutationResult {
  assetSlotCreate: Slot;
}

export const CREATE_ASSET_SLOT = gql`
  mutation AssetSlotCreate(
    $projectId: ID!
    $quantity: NonNegativeInt!
    $dateTimeFrom: DateTime!
    $dateTimeTo: DateTime!
    $slotType: SlotType!
    $assetId: ID!
  ) {
    assetSlotCreate(
      projectId: $projectId
      quantity: $quantity
      dateTimeFrom: $dateTimeFrom
      dateTimeTo: $dateTimeTo
      slotType: $slotType
      assetId: $assetId
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
