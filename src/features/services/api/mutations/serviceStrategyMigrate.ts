import { gql } from "@apollo/client";

export const SERVICE_STRATEGY_MIGRATE = gql`
  mutation ServiceStrategyMigrate($projectId: ID!, $serviceId: ID!) {
    serviceStrategyMigrate(projectId: $projectId, serviceId: $serviceId)
  }
`;
