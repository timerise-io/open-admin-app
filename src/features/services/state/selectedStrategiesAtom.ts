import { atom } from "recoil";
import {
  ServiceDayRangeStrategy,
  ServiceOnceStrategy,
  ServiceRangeStrategy,
  ServiceSlotStrategy,
} from "../model/serviceSlotStrategie";

export const selectedStrategiesAtom = atom<
  Array<ServiceSlotStrategy | ServiceRangeStrategy | ServiceDayRangeStrategy | ServiceOnceStrategy>
>({
  key: "selectedStrategiesAtom",
  default: [],
});
