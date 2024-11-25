import { selectorFamily } from "recoil";
import { bookingsAtom } from "./bookingsAtom";

export const bookingSelector = selectorFamily({
  key: "bookingSelector",
  get:
    (id: string) =>
    ({ get }) => {
      const booking = get(bookingsAtom)?.[id];
      return booking;
    },
});
