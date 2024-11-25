import { gql } from "@apollo/client";

export interface RejectInvitationMutationVariables {
  projectId: string;
}

export interface RejectInvitationMutationResult {
  teamMemberInvitationReject: string;
}

export const REJECT_INVITATION = gql`
  mutation TeamMemberInvitationReject($projectId: ID!) {
    teamMemberInvitationReject(projectId: $projectId)
  }
`;
