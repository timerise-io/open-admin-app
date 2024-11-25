import { gql } from "@apollo/client";

export interface TeamMemberSlotDeleteMutationVariables {
  projectId: string;
  userId: string;
  slotId: string;
}

export const DELETE_TEAM_MEMBER_SLOT = gql`
  mutation TeamMemberSlotDelete($projectId: ID!, $userId: ID!, $slotId: ID!) {
    teamMemberSlotDelete(projectId: $projectId, userId: $userId, slotId: $slotId)
  }
`;
