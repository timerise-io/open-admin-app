import { Project } from "features/project/model/project";
import { gql } from "@apollo/client";

export interface UpdateOrganizationMutationVariables {
  projectId: string;
  title?: string;
  localTimeZone?: string;
  defaultLocale?: string;
  smsConfig?: {
    senderName: string;
  };
}

export interface UpdateOrganizationMutationResult {
  projectUpdate: Project;
}

export const UPDATE_ORGANIZATION = gql`
  mutation OrganizationUpdate($organizationId: ID!, $labels: [NonEmptyString]) {
    organizationUpdate(organizationId: $organizationId, labels: $labels) {
      organizationId
      labels
    }
  }
`;
