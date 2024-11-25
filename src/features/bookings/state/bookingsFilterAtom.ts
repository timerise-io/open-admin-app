import { textFilterAtom } from "helpers/state/textFilterAtom";
import { DefaultValue, atom, selector } from "recoil";
import { BookingStatus } from "../model/booking";
import { BOOKING_DATE_RANGE, BookingsDateRange } from "../model/dateRange";

export interface BookingsBaseFilters {
  serviceId?: string;
  locationId?: string;
  assetId?: string;
  hostId?: string;
  date: BookingsDateRange;
  status?: BookingStatus;
}
export type BookingsFilters = {
  text: string;
} & BookingsBaseFilters;

export const bookingsFilterAtom = atom<BookingsBaseFilters>({
  key: "bookingsFilterAtom",
  default: { date: BOOKING_DATE_RANGE["90_DAYS_FROM_NOW"] },
});

export const bookingsFilterSelector = selector<BookingsFilters>({
  key: "bookingsFilterSelector",
  get: ({ get }) => {
    const filters = get(bookingsFilterAtom);
    const text = get(textFilterAtom("BOOKINGS"));

    return { ...filters, text };
  },
  set: ({ set, reset }, newValue) => {
    if (newValue instanceof DefaultValue) {
      reset(bookingsFilterAtom);
      reset(textFilterAtom("BOOKINGS"));

      return;
    }

    set(bookingsFilterAtom, {
      ...(newValue.date && { date: newValue.date }),
      ...(newValue.serviceId && { serviceId: newValue.serviceId }),
      ...(newValue.locationId && { locationId: newValue.locationId }),
      ...(newValue.assetId && { assetId: newValue.assetId }),
      ...(newValue.hostId && { hostId: newValue.hostId }),
      ...(newValue.status && { status: newValue.status }),
    });
    set(textFilterAtom("BOOKINGS"), newValue.text);
  },
});
