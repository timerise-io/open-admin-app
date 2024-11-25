import { Slot, SlotType } from "features/services/model/serviceSlotStrategie";
import { gql } from "@apollo/client";

export interface AssetSlotsQueryVariables {
  projectId: string;
  assetId: string;
  slotType: SlotType;
}

export interface AssetSlotQueryResult {
  asset: {
    slots: Array<Slot>;
  };
}

export const ASSETS_SLOTS = gql`
  query Slots($projectId: ID!, $assetId: ID!, $slotType: SlotType!) {
    asset(projectId: $projectId, assetId: $assetId) {
      slots(slotType: $slotType) {
        slotId
        slotType
        quantity
        dateTimeFrom
        dateTimeTo
        duration
      }
    }
  }
`;
