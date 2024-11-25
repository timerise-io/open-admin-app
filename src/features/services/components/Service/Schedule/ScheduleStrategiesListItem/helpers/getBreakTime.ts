import { parse, toSeconds } from "iso8601-duration";

export const getBreakTime = ({ slotInterval, duration }: { slotInterval: any; duration: any }): number | null => {
  const interval = slotInterval ? (toSeconds(parse(slotInterval)) / 60).toFixed(0) : null;
  const breakTime = interval ? Number(interval) - Number(duration) : null;

  return breakTime;
};
