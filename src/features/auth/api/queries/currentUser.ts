import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query getCurrentUser($projectId: ID!) {
    me(projectId: $projectId) {
      userId
      email
      fullName
      photoUrl
      role
      intercomUserHash
    }
  }
`;
