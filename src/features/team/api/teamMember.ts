import { gql } from "@apollo/client";

export const TEAM_MEMBER = gql`
  query getTeamMember($projectId: ID!, $userId: ID!) {
    teamMember(projectId: $projectId, userId: $userId) {
      userId
      shortId
      projectId
      role
      email
      phoneNumber
      fullName
      jobTitle
      photoUrl
    }
  }
`;
