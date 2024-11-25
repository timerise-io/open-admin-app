import { Slot, SlotType } from "features/services/model/serviceSlotStrategie";
import { gql } from "@apollo/client";

export interface TeamMemberCreateMutationVariables {
  projectId: string;
  userId: string;
  quantity: number;
  slotType: SlotType;
  dateTimeFrom: Date;
  dateTimeTo: Date;
}

export interface TeamMemberCreateMutationResult {
  teamMemberSlotCreate: Slot;
}

export const CREATE_TEAM_MEMBER_SLOT = gql`
  mutation TeamMemberSlotCreate(
    $projectId: ID!
    $userId: ID!
    $dateTimeFrom: DateTime!
    $dateTimeTo: DateTime!
    $slotType: SlotType!
    $quantity: NonNegativeInt
  ) {
    teamMemberSlotCreate(
      projectId: $projectId
      userId: $userId
      dateTimeFrom: $dateTimeFrom
      dateTimeTo: $dateTimeTo
      slotType: $slotType
      quantity: $quantity
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
