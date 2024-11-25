import React, { useMemo, useState } from "react";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
// import StrategyDeleteModal from "./StrategyDeleteModal";
// import StrategyEditModal from "./StrategyEditModal";
// import StrategySummary from "./StrategySummary";
import { DisplayType } from "features/services/api/mutations/models";
import {
  ServiceDayRangeStrategy,
  ServiceOnceStrategy,
  ServiceRangeStrategy,
} from "features/services/model/serviceSlotStrategie";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { DayRangeStrategyDeleteModal } from "./DayRangeStrategyDeleteModal";
import { DayRangeStrategyEditModal } from "./DayRangeStrategyEditModal";
import { DayRangeStrategySummary } from "./DayRangeStrategySummary";
import { OnceStrategyDeleteModal } from "./OnceStrategyDeleteModal";
import { OnceStrategyEditModal } from "./OnceStrategyEditModal";
import { OnceStrategySummary } from "./OnceStrategySummary";
import { RangeStrategyDeleteModal } from "./RangeStrategyDeleteModal";
import { RangeStrategyEditModal } from "./RangeStrategyEditModal";
import { RangeStrategySummary } from "./RangeStrategySummary";

const StrategieItemWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #d9d9d9;
  padding: 10px 10px 10px 12px;
`;

const ItemAction = styled.button`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
`;

interface ScheduleStrategiesListItemProps {
  strategy: ServiceRangeStrategy | ServiceDayRangeStrategy | ServiceOnceStrategy;
  displayType: DisplayType;
}

const ScheduleStrategiesListItem = ({ strategy, displayType }: ScheduleStrategiesListItemProps) => {
  const { t } = useTranslation();
  const [isDeleteModalOpen, setIsDeletedModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const getStrategySummary = useMemo(() => {
    switch (displayType) {
      case DisplayType.CALENDAR:
        return <DayRangeStrategySummary strategy={strategy as ServiceDayRangeStrategy} />;
      case DisplayType.DAYS:
        return <RangeStrategySummary strategy={strategy as ServiceRangeStrategy} />;
      case DisplayType.LIST:
        return <OnceStrategySummary strategy={strategy as ServiceOnceStrategy} />;
      default:
        return null;
    }
  }, [displayType, strategy]);

  const getStrategyDeleteModal = useMemo(() => {
    switch (displayType) {
      case DisplayType.CALENDAR:
        return (
          <DayRangeStrategyDeleteModal
            strategy={strategy as ServiceDayRangeStrategy}
            open={isDeleteModalOpen}
            onClose={() => setIsDeletedModalOpen(false)}
          />
        );
      case DisplayType.DAYS:
        return (
          <RangeStrategyDeleteModal
            strategy={strategy as ServiceRangeStrategy}
            open={isDeleteModalOpen}
            onClose={() => setIsDeletedModalOpen(false)}
          />
        );
      case DisplayType.LIST:
        return (
          <OnceStrategyDeleteModal
            strategy={strategy as ServiceOnceStrategy}
            open={isDeleteModalOpen}
            onClose={() => setIsDeletedModalOpen(false)}
          />
        );
      default:
        return null;
    }
  }, [displayType, strategy, isDeleteModalOpen]);

  const getStrategyUpdateModal = useMemo(() => {
    switch (displayType) {
      case DisplayType.CALENDAR:
        return (
          <DayRangeStrategyEditModal
            strategy={strategy as ServiceDayRangeStrategy}
            open={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
          />
        );
      case DisplayType.DAYS:
        return (
          <RangeStrategyEditModal
            strategy={strategy as ServiceRangeStrategy}
            open={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
          />
        );
      case DisplayType.LIST:
        return (
          <OnceStrategyEditModal
            strategy={strategy as ServiceOnceStrategy}
            open={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
          />
        );
      default:
        return null;
    }
  }, [displayType, strategy, isEditModalOpen]);

  return (
    <>
      <StrategieItemWrapper key={`strategie-${strategy.strategyId}`}>
        <Row ai="flex-start">
          <Column ai="flex-start">{getStrategySummary}</Column>
          <Row gap="10px">
            <ItemAction type="button">
              <Typography
                typographyType="label"
                as="span"
                weight="700"
                onClick={() => {
                  setIsEditModalOpen(true);
                }}
              >
                {t("edit")}
              </Typography>
            </ItemAction>
            <ItemAction
              type="button"
              onClick={() => {
                setIsDeletedModalOpen(true);
              }}
            >
              <Typography typographyType="label" as="span" weight="700" color="error">
                {t("delete")}
              </Typography>
            </ItemAction>
          </Row>
        </Row>
      </StrategieItemWrapper>
      {getStrategyDeleteModal}
      {getStrategyUpdateModal}
    </>
  );
};

export default ScheduleStrategiesListItem;
