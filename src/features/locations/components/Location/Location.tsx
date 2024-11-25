import React, { useEffect } from "react";
import { Button } from "components/Button";
import ExceptionsSection from "components/Exceptions/ExceptionsSection";
import ExtendedMenu, { ExtendedMenuButton, ExtendedMenuSplitter } from "components/dropdowns/ExtendedMenu";
import { Column } from "components/layout/Column";
import { PageContent } from "components/layout/PageContent";
import { PageHeader } from "components/layout/PageHeader";
import { Row } from "components/layout/Row";
import { DetailsPageLoader } from "components/loaders/DetailsPageLoader";
import { FullPageOverlayLoader } from "components/loaders/FullPageOverlayLoader";
import { ROUTES } from "constans/routes";
import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import BookingListColumn from "features/bookings/components/BookingsListColumn/BookingListColumn";
import WorkingDaysColumn from "features/bookings/components/WorkingDaysColumn/WorkingDaysColumn";
import { BOOKING_DATE_RANGE } from "features/bookings/model/dateRange";
import { useLocation } from "features/locations/hooks/useLocation";
import { useLocationDuplicate } from "features/locations/hooks/useLocationDuplicate";
import { useLocationExceptionCreate } from "features/locations/hooks/useLocationExceptionCreate";
import { useLocationExceptions } from "features/locations/hooks/useLocationExceptions";
import { useLocationSlotDelete } from "features/locations/hooks/useLocationSlotDelete";
import { useUpdateLocation } from "features/locations/hooks/useUpdateLocation";
import { selectedLocationExceptionsAtom } from "features/locations/state/selectedAssetExceptionsAtom";
import { selectedLocationAtom } from "features/locations/state/selectedLocationsAtom";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { Form, Formik } from "formik";
import { MediaItem } from "models/mediaItem";
import { TFunction, useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import * as Yup from "yup";
import DeleteLocationButton from "./DeleteLocationButton";
import LocationFormContent from "./LocationFormContent";

const getValidationSchema = (t: TFunction<"common"[]>) => {
  return Yup.object({
    title: Yup.string().required(t("common:validation.required")),
  });
};

const SectionWrapperRow = styled(Row)`
  gap: 32px;
  align-items: flex-start;
  justify-content: flex-start;
`;

const DetailColumn = styled(Column)`
  justify-content: flex-start;
  align-items: flex-start;
`;

const StyledRow = styled(Row)`
  gap: 10px;
`;

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
`;

const formatHour = function (hour: string): string {
  const hourParts = hour.split(":");
  const formattedHour = `${hourParts[0].padStart(2, "0")}:${hourParts[1]}`;
  return formattedHour;
};

const Location = () => {
  const { t } = useTranslation(["common"]);
  const { id } = useParams<{ id: string }>();
  useLocation(id!);
  useLocationExceptions(id!);

  const location = useRecoilValue(selectedLocationAtom);
  const selectedProjectId = useRecoilValue(selectedProjectAtom);
  const exceptions = useRecoilValue(selectedLocationExceptionsAtom);
  const navigate = useNavigate();
  const duplicateStatus = useRecoilValue(apiStatusAtom("LOCATION_DUPLICATE"));

  const { mutation: updateLocation } = useUpdateLocation();
  const { mutation: createException } = useLocationExceptionCreate();
  const { mutation: deleteException } = useLocationSlotDelete();
  const { mutation: duplicateLocation } = useLocationDuplicate();

  useEffect(() => {
    if (selectedProjectId && location && selectedProjectId !== location.projectId) {
      navigate(ROUTES.services);
    }
  }, [navigate, selectedProjectId, location]);

  if (!location)
    return (
      <PageContent>
        <DetailsPageLoader />
      </PageContent>
    );

  return (
    <Wrapper>
      {duplicateStatus.isLoading && <FullPageOverlayLoader />}
      <Formik
        initialValues={{
          title: location.title,
          mondayFrom: location.workingDays?.MONDAY?.timeFrom ?? "00:00",
          mondayTo: location.workingDays?.MONDAY?.timeTo ?? "24:00",
          tuesdayFrom: location.workingDays?.TUESDAY?.timeFrom ?? "00:00",
          tuesdayTo: location.workingDays?.TUESDAY?.timeTo ?? "24:00",
          wendsdayFrom: location.workingDays?.WEDNESDAY?.timeFrom ?? "00:00",
          wendsdayTo: location.workingDays?.WEDNESDAY?.timeTo ?? "24:00",
          thursdayFrom: location.workingDays?.THURSDAY?.timeFrom ?? "00:00",
          thursdayTo: location.workingDays?.THURSDAY?.timeTo ?? "24:00",
          fridayFrom: location.workingDays?.FRIDAY?.timeFrom ?? "00:00",
          fridayTo: location.workingDays?.FRIDAY?.timeTo ?? "24:00",
          saturdayFrom: location.workingDays?.SATURDAY?.timeFrom ?? "00:00",
          saturdayTo: location.workingDays?.SATURDAY?.timeTo ?? "24:00",
          sundayFrom: location.workingDays?.SUNDAY?.timeFrom ?? "00:00",
          sundayTo: location.workingDays?.SUNDAY?.timeTo ?? "24:00",
          description: location.description,
          media: location.media?.map((item) => item.url) ?? [],
          address: location.address,
        }}
        onSubmit={(formValues, { resetForm }) => {
          const media: MediaItem[] = formValues.media.map((url) => {
            const title = location.media?.find((item) => item.url === url)?.title;
            return {
              url: url,
              title: title ?? "Location img",
            };
          });
          updateLocation({
            locationId: location.locationId,
            projectId: location.projectId,
            title: formValues.title,
            workingDays: {
              MONDAY: {
                timeFrom: formatHour(formValues.mondayFrom),
                timeTo: formatHour(formValues.mondayTo),
              },
              TUESDAY: {
                timeFrom: formatHour(formValues.tuesdayFrom),
                timeTo: formatHour(formValues.tuesdayTo),
              },
              WEDNESDAY: {
                timeFrom: formatHour(formValues.wendsdayFrom),
                timeTo: formatHour(formValues.wendsdayTo),
              },
              THURSDAY: {
                timeFrom: formatHour(formValues.thursdayFrom),
                timeTo: formatHour(formValues.thursdayTo),
              },
              FRIDAY: {
                timeFrom: formatHour(formValues.fridayFrom),
                timeTo: formatHour(formValues.fridayTo),
              },
              SATURDAY: {
                timeFrom: formatHour(formValues.saturdayFrom),
                timeTo: formatHour(formValues.saturdayTo),
              },
              SUNDAY: {
                timeFrom: formatHour(formValues.sundayFrom),
                timeTo: formatHour(formValues.sundayTo),
              },
            },
            description: formValues.description ?? "",
            address: formValues.address ?? "",
            media,
          });
          resetForm({ values: { ...formValues } });
        }}
        validationSchema={getValidationSchema(t)}
      >
        {({ isValid, dirty, resetForm }) => {
          return (
            <Form>
              <PageHeader title={location.title} showBackButton>
                <StyledRow>
                  <Button
                    buttonType="secondary"
                    onClick={() => {
                      resetForm();
                    }}
                    disabled={!dirty}
                  >
                    {t("discard")}
                  </Button>
                  <Button buttonType="primary" disabled={!isValid || !dirty} type="submit">
                    {t("save")}
                  </Button>
                  <ExtendedMenu>
                    <ExtendedMenuButton
                      buttonType="secondary"
                      type="button"
                      onClick={() => {
                        duplicateLocation({
                          projectId: selectedProjectId ?? "",
                          locationId: location.locationId,
                        });
                      }}
                      disabled={selectedProjectId === undefined}
                    >
                      {t("duplicate")}
                    </ExtendedMenuButton>
                    <ExtendedMenuSplitter />
                    <DeleteLocationButton />
                  </ExtendedMenu>
                </StyledRow>
              </PageHeader>
              <PageContent>
                <SectionWrapperRow>
                  <DetailColumn w="530px">
                    <LocationFormContent shortId={location?.shortId} systemId={location?.locationId} />
                  </DetailColumn>
                  <DetailColumn w="334px" mt={2}>
                    <ExceptionsSection
                      title={t("availability-exceptions")}
                      slots={exceptions}
                      onDeleteConfirm={(slotId) => {
                        deleteException({
                          slotId,
                          locationId: location.locationId,
                          projectId: location.projectId,
                        });
                      }}
                      onCreateException={(item) => {
                        createException({
                          ...item,
                          locationId: location.locationId,
                          projectId: location.projectId,
                          slotType: "EXCEPTION",
                          quantity: 1,
                        });
                      }}
                    />
                    <WorkingDaysColumn title={t("locations.working-hours")} />
                    <BookingListColumn
                      title={t("locations.todays-bookings")}
                      filters={{
                        date: BOOKING_DATE_RANGE.TODAY,
                        text: "",
                        locationId: location.locationId,
                      }}
                    />
                  </DetailColumn>
                </SectionWrapperRow>
              </PageContent>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export default Location;
