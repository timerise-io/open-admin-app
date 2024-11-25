export type Roles = "SUPERADMIN" | "OWNER" | "ADMIN" | "APIADMIN" | "MANAGER" | "STAFF" | "USER";

export interface CurrentUserAtom {
  userId: string;
  email: string;
  fullName: string;
  photoUrl: string;
  role: Roles;
  intercomUserHash: string;
}
