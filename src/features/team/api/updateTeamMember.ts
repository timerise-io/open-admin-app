import { gql } from "@apollo/client";
import { User } from "../models/user";

export interface UpdateTeamMemberMutationVariables {
  projectId: string;
  userId: string;
  role: string;
  fullName?: string;
  jobTitle?: string;
  phoneNumber?: string;
  photoUrl?: string | null;
}

export interface UpdateTeamMemberMutationResult {
  teamMemberUpdate: User;
}

export const UPDATE_TEAM_MEMBER = gql`
  mutation TeamMemberUpdate(
    $projectId: ID!
    $userId: ID!
    $role: UserRole!
    $fullName: String
    $jobTitle: String
    $phoneNumber: PhoneNumber
    $photoUrl: String
  ) {
    teamMemberUpdate(
      projectId: $projectId
      userId: $userId
      role: $role
      fullName: $fullName
      jobTitle: $jobTitle
      phoneNumber: $phoneNumber
      photoUrl: $photoUrl
    ) {
      userId
      shortId
      projectId
      role
      email
      phoneNumber
      fullName
      jobTitle
      photoUrl
    }
  }
`;
