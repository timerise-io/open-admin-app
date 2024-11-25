export interface UpdateThemeMutationVariables {
  projectId: string;
  theme?: string;
  logoUrl?: string;
}

export interface UpdateThemeMutationResult {
  projectUpdate: {
    projectId: string;
    theme: "LIGHT" | "DARK";
    logoUrl: string;
  };
}
