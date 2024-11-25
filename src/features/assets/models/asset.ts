import { Location } from "features/locations/model/location";
import { MediaItem } from "models/mediaItem";

export interface Asset {
  projectId: string;
  assetId: string;
  shortId: string;
  title: string;
  description: string;
  quantity: number;
  location: Location | null;
  media: Array<MediaItem>;
}
