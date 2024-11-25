import { Slot, SlotType } from "features/services/model/serviceSlotStrategie";
import { gql } from "@apollo/client";

export interface LocationSlotsQueryVariables {
  projectId: string;
  locationId: string;
  slotType: SlotType;
}

export interface LocationSlotQueryResult {
  location: {
    slots: Array<Slot>;
  };
}

export const LOCATION_SLOTS = gql`
  query Slots($projectId: ID!, $locationId: ID!, $slotType: SlotType!) {
    location(projectId: $projectId, locationId: $locationId) {
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
