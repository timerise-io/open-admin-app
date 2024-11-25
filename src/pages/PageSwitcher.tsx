import React, { Suspense } from "react";
import MobilePlaceholder from "components/MobilePlaceholder";
import WelcomeModal from "components/WelcomeModal";
import { FullPageLoader } from "components/loaders/FullPageLoader";
import { ROUTES } from "constans/routes";
import { useAssets } from "features/assets/hooks/useAssets";
import { useAssetsDictionary } from "features/assets/hooks/useAssetsDictionary";
import { AuthorizedContent } from "features/auth/components/AuthorizedContent";
import { PrivateRoute } from "features/auth/components/PrivateRoute";
import { useCurrentUser } from "features/auth/hooks/useCurrentUser";
import { authUserAtom } from "features/auth/state/authUserAtom";
import { useLocations } from "features/locations/hooks/useLocations";
import { useLocationsDictionary } from "features/locations/hooks/useLocationsDictionary";
import { useProjects } from "features/project/hooks/useProjects";
import { useServices } from "features/services/hooks/useServices";
import { useServicesDictionary } from "features/services/hooks/useServicesDictionary";
import { useSpaces } from "features/spaces/hooks/useSpaces";
import { useSpacesDictionary } from "features/spaces/hooks/useSpacesDictionary";
import { useInvitations } from "features/team/hooks/useInvitations";
import { useTeam } from "features/team/hooks/useTeam";
import { useTeamDictionary } from "features/team/hooks/useTeamDictionary";
import ToastHolder from "features/toast/components/ToastHolder";
import { Route, Routes, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import AssetAddPage from "./AssetAddPage";
import AssetPage from "./AssetPage";
import AssetsPage from "./AssetsPage";
import BillingPage from "./BillingPage";
import BookingPage from "./BookingPage";
import BookingPageSettings from "./BookingPageSettingsPage";
import BookingsPage from "./BookingsPage";
import CommunicationSettingsPage from "./CommunicationSettingsPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import HomePage from "./HomePage";
import LocationAddPage from "./LocationAddPage";
import LocationPage from "./LocationPage";
import LocationsPage from "./LocationsPage";
import LoginPage from "./LoginPage";
import MainPageContent from "./MainPageContent";
import ProjectSettings from "./ProjectSettingsPage";
import ServiceAddPage from "./ServiceAddPage";
import ServicePage from "./ServicePage";
import ServicesPage from "./ServicesPage";
import SpaceAddPage from "./SpaceAddPage";
import SpacePage from "./SpacePage";
import SpacesPage from "./SpacesPage";
import TeamMemberInvitePage from "./TeamMemberInvitePage";
import TeamMemberPage from "./TeamMemberPage";
import TeamPage from "./TeamPage";
import WidgetSettingsPage from "./WidgetSettingsPage";

const DictionaryHooks = () => {
  useSpacesDictionary();
  useLocationsDictionary();
  useServicesDictionary();
  useAssetsDictionary();
  useTeamDictionary();
  useProjects();
  useServices();
  useSpaces();
  useLocations();
  useAssets();
  useCurrentUser();
  useTeam();
  useInvitations();
  return null;
};

const LargeScreen = styled.div`
  @media (max-width: 999px) {
    display: none;
  }
`;

export const PageSwitcher: React.FC = () => {
  const location = useLocation();
  const authUser = useRecoilValue(authUserAtom);

  return (
    <>
      <MobilePlaceholder />
      <LargeScreen>
        <ToastHolder />
        <AuthorizedContent>
          <DictionaryHooks />
        </AuthorizedContent>
        <Suspense fallback={null}>
          {authUser.state === "unknown" ? (
            <FullPageLoader />
          ) : (
            <MainPageContent>
              <Routes location={location}>
                <Route path={ROUTES.signIn} element={<LoginPage />} />
                <Route path={ROUTES.forgotPassword} element={<ForgotPasswordPage />} />
                <Route
                  path={ROUTES.bookings}
                  element={
                    <PrivateRoute>
                      <BookingsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={ROUTES.booking}
                  element={
                    <PrivateRoute>
                      <BookingPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={ROUTES.services}
                  element={
                    <PrivateRoute>
                      <ServicesPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={ROUTES.serviceAdd}
                  element={
                    <PrivateRoute>
                      <ServiceAddPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={ROUTES.service}
                  element={
                    <PrivateRoute>
                      <ServicePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={ROUTES.spaces}
                  element={
                    <PrivateRoute>
                      <SpacesPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={ROUTES.spaceAdd}
                  element={
                    <PrivateRoute>
                      <SpaceAddPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={ROUTES.space}
                  element={
                    <PrivateRoute>
                      <SpacePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={ROUTES.locations}
                  element={
                    <PrivateRoute>
                      <LocationsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={ROUTES.locationAdd}
                  element={
                    <PrivateRoute>
                      <LocationAddPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={ROUTES.location}
                  element={
                    <PrivateRoute>
                      <LocationPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={ROUTES.assets}
                  element={
                    <PrivateRoute>
                      <AssetsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={ROUTES.assetAdd}
                  element={
                    <PrivateRoute>
                      <AssetAddPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={ROUTES.asset}
                  element={
                    <PrivateRoute>
                      <AssetPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={ROUTES.projectSettings}
                  element={
                    <PrivateRoute>
                      <ProjectSettings />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={ROUTES.communicationSettings}
                  element={
                    <PrivateRoute>
                      <CommunicationSettingsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={ROUTES.bookingPageSettings}
                  element={
                    <PrivateRoute>
                      <BookingPageSettings />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={ROUTES.settingsWidget}
                  element={
                    <PrivateRoute>
                      <WidgetSettingsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={ROUTES.team}
                  element={
                    <PrivateRoute>
                      <TeamPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={ROUTES.teamMemberInvite}
                  element={
                    <PrivateRoute>
                      <TeamMemberInvitePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={ROUTES.teamMember}
                  element={
                    <PrivateRoute>
                      <TeamMemberPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={ROUTES.teamMe}
                  element={
                    <PrivateRoute>
                      <TeamMemberPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={ROUTES.teamMeConnections}
                  element={
                    <PrivateRoute>
                      <TeamMemberPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={ROUTES.billing}
                  element={
                    <PrivateRoute>
                      <BillingPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={ROUTES.home}
                  element={
                    <PrivateRoute>
                      <HomePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/*"
                  element={
                    <PrivateRoute>
                      <BookingsPage />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </MainPageContent>
          )}
        </Suspense>
        <AuthorizedContent>
          <WelcomeModal />
        </AuthorizedContent>
      </LargeScreen>
    </>
  );
};
