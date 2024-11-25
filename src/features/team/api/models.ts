import { Invitation } from "../models/invitation";
import { User } from "../models/user";

export interface InvitationsQueryVariables {
  projectId: string;
}

export interface InvitationsQueryResult {
  invitations: Array<Invitation>;
}

export interface TeamQueryVariables {
  projectId: string;
}

export interface TeamQueryResult {
  team: Array<User>;
}

export interface TeamMemberQueryVariables {
  projectId: string;
  userId: string;
}

export interface TeamMemberQueryResult {
  teamMember: User;
}
