import React, { PropsWithChildren, useMemo } from "react";
import { Card } from "components/Card";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { PageContent } from "components/layout/PageContent";
import { PageHeader } from "components/layout/PageHeader";
import { Row } from "components/layout/Row";
import { DisplayType } from "features/services/api/mutations/models";
import { selectedServiceAtom } from "features/services/state/selectedServiceAtom";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ExceptionsSection from "./Exceptions/ExceptionsSection";
import { AddCalendarScheduleModal, AddDaysScheduleModal, AddEventScheduleModal } from "./Modals";
import ScheduleStrategiesList from "./ScheduleStrategiesList";

const StyledColumn = styled(Column)`
  width: 530px;
`;

const StyledHeader = styled(Typography)`
  margin-top: 32px;
`;

const ScheduleView: React.FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();
  const service = useRecoilValue(selectedServiceAtom);
  const displayType = service?.viewConfig?.displayType;

  const getAddScheduleModal = useMemo(() => {
    switch (displayType) {
      case DisplayType.CALENDAR:
        return <AddCalendarScheduleModal />;
      case DisplayType.DAYS:
        return <AddDaysScheduleModal />;
      case DisplayType.LIST:
        return <AddEventScheduleModal />;
      default:
        return null;
    }
  }, [displayType]);

  if (!service || !displayType) return null;

  return (
    <>
      <PageHeader title={service.title} showBackButton></PageHeader>
      <PageContent>
        {children}
        <Row gap="32px" ai="flex-start" jc="flex-start">
          <StyledColumn ai="flex-start">
            <StyledHeader typographyType="h3" as="h3">
              {t("availability")}
            </StyledHeader>
            <Card>
              <Column ai="flex-start" gap="20px">
                <Typography typographyType="body" as="span">
                  {t("availability-info")}
                </Typography>
                {getAddScheduleModal}
                <ScheduleStrategiesList displayType={displayType} />
              </Column>
            </Card>
            {/* <StyledHeader typographyType="h3" as="h3">
              Display
            </StyledHeader>
            <Card>
              <Column ai="flex-start" gap="20px">
                <Typography typographyType="body" as="span">
                  Decide what form of display you want for the time slots on the booking page.
                </Typography>
                <SlotsDisplayPicker />
              </Column>
            </Card> */}
          </StyledColumn>
          <Column ai="flex-start" jc="flex-start" w="334px" pt={2}>
            <ExceptionsSection />
          </Column>
        </Row>
      </PageContent>
    </>
  );
};

export default ScheduleView;
