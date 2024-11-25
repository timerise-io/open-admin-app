import { selector } from "recoil";
import { Roles } from "../model/currentUser";
import { UserPrivileges } from "../model/userPrivileges";
import { currentUserAtom } from "./currentUserAtom";

const CAN_EDIT_OTHER_PROFILES: Array<Roles> = ["SUPERADMIN", "OWNER", "ADMIN", "APIADMIN", "MANAGER"];
const CAN_DELETE_OTHER_PROFILES: Array<Roles> = ["SUPERADMIN", "OWNER", "ADMIN", "APIADMIN", "MANAGER"];

export const currentUserPrivilegesSelector = selector<UserPrivileges>({
  key: "currentUserPrivilegesSelector",
  get: ({ get }) => {
    const user = get(currentUserAtom);

    if (!user) {
      return {
        canEditOtherProfiles: false,
        canUseConnections: false,
        canDeleteOtherProfiles: false,
      };
    }

    return {
      canEditOtherProfiles: CAN_EDIT_OTHER_PROFILES.includes(user.role),
      canUseConnections: true,
      canDeleteOtherProfiles: CAN_DELETE_OTHER_PROFILES.includes(user.role),
    };
  },
});
