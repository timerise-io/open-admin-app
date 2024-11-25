import { selectedProjectSelector } from "features/project/state/selectedProjectSelector";
import { formatInTimezone } from "helpers/timeFormat";
import { selector } from "recoil";
import { hostDashboardAtom } from "../state/hostDashboardAtom";

const emptyState = new Array(24).fill(1).map((item, index) => {
  return {
    hour: index,
    time: `${index}:00`,
    new: 0,
    accepted: 0,
    canceled: 0,
  };
});

export const myTodayBookingChartSelector = selector({
  key: `myTodayBookingChartSelector`,
  get: ({ get }) => {
    const { todayAll } = get(hostDashboardAtom);
    const project = get(selectedProjectSelector);
    const timezone = project?.localTimeZone ?? "Europe/London";

    const result = [...emptyState];

    for (let i = 0; i < todayAll.length; ++i) {
      const currentItem = todayAll[i];

      const newInc = currentItem.status === "NEW" || currentItem.status === "CONFIRMED" ? 1 : 0;
      const acceptedInc = currentItem.status === "ACCEPTED" ? 1 : 0;
      const canceledInc = currentItem.status === "CANCELED" || currentItem.status === "REJECTED" ? 1 : 0;
      const index = +formatInTimezone(currentItem.dateTimeFrom, "H", timezone);

      result[index] = {
        ...result[index],
        new: newInc + result[index].new,
        accepted: acceptedInc + result[index].accepted,
        canceled: canceledInc + result[index].canceled,
      };
    }

    return result;
  },
});
