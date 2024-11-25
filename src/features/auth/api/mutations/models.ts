export interface LogInMutationVariables {
  email: string;
  password: string;
}

export interface LogInMutationResult {
  login: string;
}

export interface ResetPasswordMutationVariables {
  email: string;
  organizationId?: string;
  projectId?: string;
}

export interface ResetPasswordMutationResult {
  resetPassword: string;
}
