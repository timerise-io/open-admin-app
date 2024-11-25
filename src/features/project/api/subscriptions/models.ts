export interface ProjectSubscriptionVariables {
  projectId: string;
}

export interface ProjectSubscriptionResult {
  project: {
    bookingsLimit: number;
    subscriptionPlan: {
      title: string;
    };
  };
}
