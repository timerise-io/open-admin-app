import { MediaItem } from "models/mediaItem";

export interface WorkingHours {
  timeFrom: string;
  timeTo: string;
}

export interface WorkingDays {
  MONDAY?: WorkingHours;
  TUESDAY?: WorkingHours;
  WEDNESDAY?: WorkingHours;
  THURSDAY?: WorkingHours;
  FRIDAY?: WorkingHours;
  SATURDAY?: WorkingHours;
  SUNDAY?: WorkingHours;
}

export interface Location {
  projectId: string;
  locationId: string;
  shortId: string;
  title: string;
  workingDays: WorkingDays;
  description: string;
  address: string;
  media: Array<MediaItem> | null;
}
