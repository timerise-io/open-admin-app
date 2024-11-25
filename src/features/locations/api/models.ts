import { Location } from "../model/location";

export interface LocationsQueryVariables {
  projectId: string;
  query: string;
}

export interface LocationsQueryResult {
  locations: Array<Location>;
}

export interface LocationQueryVariables {
  projectId: string;
  locationId: string;
}

export interface LocationQueryResult {
  location: Location;
}
