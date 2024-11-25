import { gql } from "@apollo/client";

export const RESET_PASSWORD = gql`
  mutation ResetPassword($email: EmailAddress!, $organizationId: ID, $projectId: ID) {
    resetPassword(email: $email, organizationId: $organizationId, projectId: $projectId)
  }
`;
