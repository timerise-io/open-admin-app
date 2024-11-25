import { Project } from "features/project/model/project";
import { gql } from "@apollo/client";

export interface UpdateProjectMutationVariables {
  projectId: string;
  title?: string;
  localTimeZone?: string;
  defaultLocale?: string;
  smsConfig?: {
    senderName: string;
  };
  labels?: Array<string>;
}

export interface UpdateProjectMutationResult {
  projectUpdate: Project;
}

export const UPDATE_PROJECT = gql`
  mutation ProjectUpdate(
    $projectId: ID!
    $title: NonEmptyString
    $localTimeZone: TimeZone
    $defaultLocale: Locale
    $smsConfig: SmsConfigInput
    $labels: [NonEmptyString]
  ) {
    projectUpdate(
      projectId: $projectId
      title: $title
      localTimeZone: $localTimeZone
      defaultLocale: $defaultLocale
      smsConfig: $smsConfig
      labels: $labels
    ) {
      projectId
      title
      logoUrl
      textColor
      linkColor
      buttonTextColor
      buttonBackgroundColor
      labels
      theme
      localTimeZone
      defaultLocale
      emailConfig {
        senderName
        senderEmail
      }
      smsConfig {
        senderName
      }
    }
  }
`;
