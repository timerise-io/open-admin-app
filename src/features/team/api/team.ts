import { gql } from "@apollo/client";

export const TEAM = gql`
  query getTeam($projectId: ID!) {
    team(projectId: $projectId) {
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
