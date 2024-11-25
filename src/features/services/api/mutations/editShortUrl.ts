import { gql } from "@apollo/client";

export interface EditShortUrlVariables {
  projectId: string;
  serviceId: string;
  alias: string;
}

export interface EditShortUrlResult {
  serviceShortUrlUpdate: string;
}

export const EDIT_SHORT_URL = gql`
  mutation ServiceShortUrlUpdate($projectId: ID!, $serviceId: ID!, $alias: NonEmptyString!) {
    serviceShortUrlUpdate(projectId: $projectId, serviceId: $serviceId, alias: $alias)
  }
`;
