import { Organization } from "features/project/model/organization";
import { Project } from "features/project/model/project";

export interface ProjectsResult {
  projects: Array<Project>;
}

export interface ProjectsQueryVariables {}

export interface OrganizationQueryVariables {
  organizationId: string;
}

export interface OrganizationQueryResult {
  organization: Organization;
}
