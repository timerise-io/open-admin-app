import { gql } from "@apollo/client";

export interface CreateGhostUserVariables {
  projectId: string;
  email?: string;
}

export interface CreateGhostUserResult {
  teamCreateGhostUser: { userId: string };
}

export const CREATE_GHOST_USER = gql`
  mutation TeamCreateGhostUser($projectId: ID!, $email: EmailAddress) {
    teamCreateGhostUser(projectId: $projectId, email: $email) {
      userId
    }
  }
`;
