import { Asset } from "features/assets/models/asset";

export interface AssetsQueryVariables {
  projectId: string;
  query: string;
  locationId?: string;
}

export interface AssetsQueryResult {
  assets: Array<Asset>;
}
