import { useSubscription } from "@apollo/client";
import { ProjectSubscriptionResult, ProjectSubscriptionVariables } from "../api/subscriptions/models";
import { PROJECT_SUBSCRIPTION } from "../api/subscriptions/project";

export const useProjectSubscription = (projectId: string) => {
  const { data, loading, error } = useSubscription<ProjectSubscriptionResult, ProjectSubscriptionVariables>(
    PROJECT_SUBSCRIPTION,
    {
      variables: {
        projectId,
      },
    },
  );

  return {
    subscription: data,
    loading,
    error,
  };
};
