export const invitationStatusMap: Record<InvitationStatus, string> = {
  NEW: "New",
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};
export enum InvitationStatus {
  NEW = "NEW",
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}
export interface Invitation {
  projectId: string;
  invitationId: string;
  status: InvitationStatus;
  role: "OWNER" | "ADMIN" | "MANAGER" | "STAFF";
  email: string;
  phoneNumber?: string;
  fullName?: string;
  jobTitle?: string;
  photoUrl?: string;
}
