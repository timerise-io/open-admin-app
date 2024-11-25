export interface Project {
  projectId: string;
  title: string;
  logoUrl: string;
  textColor: string;
  linkColor: string;
  buttonTextColor: string;
  buttonBackgroundColor: string;
  labels: Array<string>;
  theme: "LIGHT" | "DARK";
  localTimeZone?: string;
  defaultLocale?: string;
  pendingTeamMemberInvite?: boolean;
  bookingsLimit: number | null;
  organizationId: string;
  subscriptionPlan: {
    title: string;
    bookingsLimit: number;
  };
  emailConfig?: {
    senderName: string;
    senderEmail: string;
  };
  smsConfig?: {
    senderName: string;
  };
  stripeConfig: {
    pk: string | null;
    isConfigured: boolean | null;
  } | null;
  adyenConfig: {
    merchantAccount: string | null;
    liveEndpointUrlPrefix: string | null;
    isConfigured: boolean | null;
  } | null;
}
