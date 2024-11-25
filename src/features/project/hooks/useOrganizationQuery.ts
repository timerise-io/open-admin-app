import { useQuery } from "@apollo/client";
import { OrganizationQueryResult, OrganizationQueryVariables } from "../api/queries/models";
import { ORGANIZATION } from "../api/queries/organization";

export const useOrganizationQuery = (organizationId: string) => {
  const { data, loading, error } = useQuery<OrganizationQueryResult, OrganizationQueryVariables>(ORGANIZATION, {
    variables: {
      organizationId,
    },
  });

  return {
    data,
    loading,
    error,
  };
};
