import { gql } from "@apollo/client";

export interface TeamMemberDeleteMutationVariables {
  projectId: string;
  userId: string;
}

export const DELETE_TEAM_MEMBER = gql`
  mutation TeamMemberDelete($projectId: ID!, $userId: ID!) {
    teamMemberDelete(projectId: $projectId, userId: $userId)
  }
`;
