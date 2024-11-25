import { gql } from "@apollo/client";

export const ORGANIZATION = gql`
  query Organization($organizationId: ID!) {
    organization(organizationId: $organizationId) {
      organizationId
      labels
    }
  }
`;
