export interface User {
  userId: string;
  shortId: string;
  projectId: string;
  role: "OWNER" | "ADMIN" | "MANAGER" | "STAFF";
  email: string;
  phoneNumber: string;
  fullName: string;
  jobTitle: string;
  photoUrl: string;
}
