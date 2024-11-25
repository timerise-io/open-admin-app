import { gql } from "@apollo/client";

export const INVITATIONS = gql`
  query getInvitations($projectId: ID!) {
    invitations(projectId: $projectId) {
      projectId
      invitationId
      status
      email
      role
      fullName
      jobTitle
      phoneNumber
      photoUrl
    }
  }
`;
