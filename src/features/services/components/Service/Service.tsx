import React, { useEffect, useState } from "react";
import { PageContent } from "components/layout/PageContent";
import { Row } from "components/layout/Row";
import { DetailsPageLoader } from "components/loaders/DetailsPageLoader";
import { ROUTES } from "constans/routes";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { DisplayType } from "features/services/api/mutations/models";
import { useService } from "features/services/hooks/useService";
import { useServiceExceptions } from "features/services/hooks/useServiceExceptions";
import { selectedServiceAtom } from "features/services/state/selectedServiceAtom";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled, { css } from "styled-components";
import BookingPageFormConfig from "./BookingPage/BookingPageFormConfig";
import GeneralInfo from "./GeneralInfo";
import ScheduleView from "./Schedule/ScheduleView";
import { ServiceDisplay } from "./ServiceDisplay";

const Tabs = styled(Row)`
  gap: 20px;
  border-bottom: 1px #e6e6e6 solid;
  z-index: 100;
  position: sticky;
  top: 100px;
  background: #f6f6f6;
`;

const Tab = styled.button<{ selected: boolean }>`
  all: unset;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 13px;
  line-height: 20px;
  padding-bottom: 4px;
  cursor: pointer;
  ${({ selected }) => {
    if (!selected) return "border-bottom: 2px transparent solid";
    return css`
      border-bottom: 2px #333333 solid;
    `;
  }}
`;

export const Service = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  useService(id!);
  useServiceExceptions(id!);
  const [tab, setTab] = useState<"service" | "schedule" | "booking-page" | "display">("service");

  const service = useRecoilValue(selectedServiceAtom);
  const selectedProjectId = useRecoilValue(selectedProjectAtom);
  const navigate = useNavigate();
  const showSchedule = service?.viewConfig?.displayType !== DisplayType.PREORDER;

  useEffect(() => {
    if (selectedProjectId && service && selectedProjectId !== service.project.projectId) {
      navigate(ROUTES.services);
    }
  }, [navigate, selectedProjectId, service]);

  const tabs = (
    <Tabs jc="flex-start">
      <Tab selected={tab === "service"} onClick={() => setTab("service")} type="button">
        {t("services.tab-general")}
      </Tab>
      {showSchedule && (
        <Tab selected={tab === "schedule"} onClick={() => setTab("schedule")} type="button">
          {t("services.tab-schedule")}
        </Tab>
      )}
      <Tab selected={tab === "booking-page"} onClick={() => setTab("booking-page")} type="button">
        {t("services.tab-form")}
      </Tab>
      <Tab selected={tab === "display"} onClick={() => setTab("display")} type="button">
        {t("services.tab-display")}
      </Tab>
    </Tabs>
  );

  if (!service)
    return (
      <PageContent>
        <DetailsPageLoader />
      </PageContent>
    );

  return (
    <>
      {tab === "service" && <GeneralInfo>{tabs}</GeneralInfo>}
      {tab === "schedule" && <ScheduleView>{tabs}</ScheduleView>}
      {tab === "booking-page" && <BookingPageFormConfig>{tabs}</BookingPageFormConfig>}
      {tab === "display" && <ServiceDisplay>{tabs}</ServiceDisplay>}
    </>
  );
};
