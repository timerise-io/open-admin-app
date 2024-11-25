import { useQuery } from "@apollo/client";
import { ProjectSubscriptionResult, ProjectSubscriptionVariables } from "../api/subscriptions/models";
import { PROJECT_QUERY } from "../api/subscriptions/project";

export const useProjectQuery = (projectId: string) => {
  const { data, loading, error } = useQuery<ProjectSubscriptionResult, ProjectSubscriptionVariables>(PROJECT_QUERY, {
    variables: {
      projectId,
    },
  });

  return {
    data,
    loading,
    error,
  };
};
