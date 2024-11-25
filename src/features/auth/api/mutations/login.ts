import { gql } from "@apollo/client";

export const LOG_IN = gql`
  mutation LogIn($email: EmailAddress!, $password: NonEmptyString!) {
    login(email: $email, password: $password)
  }
`;
