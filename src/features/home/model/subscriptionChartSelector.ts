import { getDaysInMonth } from "date-fns";
import { selectedProjectSelector } from "features/project/state/selectedProjectSelector";
import { selector } from "recoil";
import { adminDashboardAtom } from "../state/adminDashboardAtom";
import { SubscriptionDashboard } from "./adminDashboard";

export const subscriptionChartSelector = selector({
  key: `subscriptionChartSelector`,
  get: ({ get }) => {
    const { subscriptionReports: adminData } = get(adminDashboardAtom);
    const project = get(selectedProjectSelector);

    const daysCount = getDaysInMonth(new Date());

    const result: SubscriptionDashboard = new Array(daysCount).fill(1).map((item, index) => {
      return {
        dateTime: `${index + 1}`,
        BOOKING_CREATED: 0,
        EMAIL_SENT: 0,
        SMS_SENT: 0,
      };
    });

    if (!project) return result;

    for (let i = 0; i < adminData.length; ++i) {
      const day = new Date(adminData[i].dateTime.split("T")[0]).getDate();

      result[day - 1] = {
        ...adminData[i],
        dateTime: `${day}`,
      };
    }

    let acc = 0;
    for (let i = 0; i < result.length; ++i) {
      acc += result[i].BOOKING_CREATED;

      result[i] = {
        ...result[i],
        BOOKING_CREATED: project.subscriptionPlan.bookingsLimit - acc,
      };
    }

    return result;
  },
});
