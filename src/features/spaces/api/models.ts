import { Space } from "../model/space";

export interface SpacesQueryVariables {
  projectId: string;
  query: string;
}

export interface SpacesQueryResult {
  spaces: Array<Space>;
}

export interface SpaceQueryVariables {
  projectId: string;
  spaceId: string;
}

export interface SpaceQueryResult {
  space: Space;
}
