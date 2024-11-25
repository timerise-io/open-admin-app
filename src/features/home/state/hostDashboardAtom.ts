import { atom } from "recoil";
import { HostDashboardBookings } from "../model/hostDashboard";

export const hostDashboardAtom = atom<HostDashboardBookings>({
  key: `hostDashboardAtom`,
  default: {
    today: [],
    todayUpcoming: [],
    tomorrow: [],
    weekUpcoming: [],
    todayAll: [],
  },
});
