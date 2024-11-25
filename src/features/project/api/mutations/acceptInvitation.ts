import { gql } from "@apollo/client";

export interface AcceptInvitationMutationVariables {
  projectId: string;
}

export interface AcceptInvitationMutationResult {
  teamMemberInvitationAccept: string;
}

export const ACCEPT_INVITATION = gql`
  mutation TeamMemberInvitationAccept($projectId: ID!) {
    teamMemberInvitationAccept(projectId: $projectId)
  }
`;
