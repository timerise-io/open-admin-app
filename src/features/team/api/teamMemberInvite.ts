import { Roles } from "features/auth/model/currentUser";
import { gql } from "@apollo/client";

interface TeamMemberInvitation {
  email: string;
  role: Roles;
  fullName?: string;
  jobTitle?: string;
  phoneNumber?: string;
  photoUrl?: string;
}

export interface TeamMemberInviteMutationVariables {
  projectId: string;
  invitations: TeamMemberInvitation[];
}

export interface TeamMemberInviteMutationResult {
  teamMemberInvite: string;
}

export const INVITE = gql`
  mutation TeamMemberInvite($projectId: ID!, $invitations: [TeamMemberInvitationInput!]!) {
    teamMemberInvite(projectId: $projectId, invitations: $invitations)
  }
`;
