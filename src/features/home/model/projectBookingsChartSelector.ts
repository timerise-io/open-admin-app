import { add, format, startOfWeek } from "date-fns";
import { selectedProjectSelector } from "features/project/state/selectedProjectSelector";
import { selector } from "recoil";
import { adminDashboardAtom } from "../state/adminDashboardAtom";
import { ProjectBookingsDashboardDayChartData } from "./adminDashboard";

const WEEK_BEGIN = startOfWeek(new Date(), { weekStartsOn: 1 });

export const projectBookingsChartSelector = selector({
  key: `projectBookingsChartSelector`,
  get: ({ get }) => {
    const { projectBookings: adminData } = get(adminDashboardAtom);
    const project = get(selectedProjectSelector);

    const chartData: Array<ProjectBookingsDashboardDayChartData> = new Array(7).fill(1).map((item, index) => {
      return {
        dateTime: `${index + 1}`,
        BOOKING_BOOKED_ACCEPTED: 0,
        BOOKING_BOOKED_CANCELED: 0,
        dayName: format(add(WEEK_BEGIN, { days: index }), "EEEE"),
      };
    });

    if (!project) return chartData;

    for (let i = 0; i < adminData.length; ++i) {
      const day = new Date(adminData[i].dateTime.split("T")[0]).getDay();

      chartData[day - 1] = {
        ...chartData[day - 1],
        ...adminData[i],
        dateTime: `${day}`,
      };
    }

    // let acc = 0;
    // for (let i = 0; i < result.length; ++i) {
    //   acc += result[i].BOOKING_CREATED;

    //   result[i] = {
    //     ...result[i],
    //     BOOKING_CREATED: project.subscriptionPlan.bookingsLimit - acc,
    //   };
    // }

    // const result: ProjectBookingsDashboardChartData = {
    //   chartData,
    // };

    return chartData;
  },
});
