type ProjectLoader = "PROJECTS" | "UPDATE_PROJECT" | "ACCEPT_INVITATION" | "REJECT_INVITATION";

type AssetLoader =
  | "ASSET"
  | "ASSETS"
  | "CREATE_ASSET"
  | "UPDATE_ASSET"
  | "DELETE_ASSET"
  | "ASSET_DUPLICATE"
  | "CREATE_ASSET_SLOT"
  | "DELETE_ASSET_SLOT";

type LocationLoader =
  | "LOCATIONS"
  | "CREATE_LOCATION"
  | "UPDATE_LOCATION"
  | "DELETE_LOCATION"
  | "LOCATION_DUPLICATE"
  | "LOCATION_SLOTS"
  | "CREATE_LOCATION_SLOT"
  | "DELETE_LOCATION_SLOT";

type SpaceLoader = "SPACES" | "CREATE_SPACE" | "UPDATE_SPACE" | "DELETE_SPACE" | "SPACE_DUPLICATE";

type ServiceLoader =
  | "SERVICES"
  | "SERVICE"
  | "CREATE_SERVICE"
  | "DELETE_SERVICE"
  | "UPDATE_SERVICE"
  | "SERVICE_DUPLICATE"
  | "CREATE_SERVICE_STRATEGY"
  | "UPDATE_SERVICE_STRATEGY"
  | "DELETE_SERVICE_STRATEGY"
  | "CREATE_SERVICE_SLOT"
  | "DELETE_SERVICE_SLOT"
  | "UPDATE_SERVICE_SHORT_URL";

type BookingLoader =
  | "BOOKINGS"
  | "REJECT_BOOKING"
  | "CANCEL_BOOKING"
  | "CONFIRM_BOOKING"
  | "ACCEPT_BOOKING"
  | "UPDATE_BOOKING_NOTE";

type TeamLoader =
  | "TEAM"
  | "TEAM_MEMBER"
  | "INVITATIONS"
  | "INVITE"
  | "CALENDARS_AUTH_URL"
  | "CALENDARS"
  | "TEAM_MEMBER_SLOTS"
  | "CREATE_GHOST_USER";

type BillingLoader = "BILLING";

type HomeLoader = "HOST_DASHBOARD" | "ADMIN_DASHBOARD";

export type Loaders =
  | ProjectLoader
  | ServiceLoader
  | LocationLoader
  | SpaceLoader
  | AssetLoader
  | TeamLoader
  | BookingLoader
  | ProjectLoader
  | BillingLoader
  | HomeLoader;
