import { Slot, SlotType } from "features/services/model/serviceSlotStrategie";
import { gql } from "@apollo/client";

export interface TeamMemberSlotsQueryVariables {
  projectId: string;
  userId: string;
  slotType: SlotType;
}

export interface TeamMemberSlotsQueryResult {
  teamMember: {
    slots: Array<Slot>;
  };
}

export const TEAM_MEMBER_SLOTS = gql`
  query Slots($projectId: ID!, $userId: ID!, $slotType: SlotType!) {
    teamMember(projectId: $projectId, userId: $userId) {
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
