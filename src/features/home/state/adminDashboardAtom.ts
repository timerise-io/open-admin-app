import { atom } from "recoil";
import { AdminDashboard } from "../model/adminDashboard";

export const adminDashboardAtom = atom<AdminDashboard>({
  key: `adminDashboardAtom`,
  default: { subscriptionReports: [], projectBookings: [] },
});
