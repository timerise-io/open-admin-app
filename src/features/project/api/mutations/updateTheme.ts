import { gql } from "@apollo/client";

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($projectId: ID!, $theme: Theme, $logoUrl: URL) {
    projectUpdate(projectId: $projectId, theme: $theme, logoUrl: $logoUrl) {
      projectId
      theme
      logoUrl
    }
  }
`;
