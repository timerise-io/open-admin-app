import { gql } from "@apollo/client";

export interface BillingUrlQueryVariables {}

export interface BillingUrlQueryResult {
  billingPortalLink: string;
}

export const BILLING_URL = gql`
  query BillingUrl {
    billingPortalLink
  }
`;
