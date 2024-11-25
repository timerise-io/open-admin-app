import { gql } from "@apollo/client";

export const PROJECT_SUBSCRIPTION = gql`
  subscription Project($projectId: ID!) {
    project(projectId: $projectId) {
      bookingsLimit
      subscriptionPlan {
        title
      }
    }
  }
`;

export const PROJECT_QUERY = gql`
  query Project($projectId: ID!) {
    project(projectId: $projectId) {
      bookingsLimit
      subscriptionPlan {
        title
      }
    }
  }
`;
