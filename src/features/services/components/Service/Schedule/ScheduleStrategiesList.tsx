import React from "react";
// import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import { DisplayType } from "features/services/api/mutations/models";
import {
  ServiceDayRangeStrategy,
  ServiceOnceStrategy,
  ServiceRangeStrategy,
} from "features/services/model/serviceSlotStrategie";
import { selectedStrategiesAtom } from "features/services/state/selectedStrategiesAtom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ScheduleStrategiesListItem from "./ScheduleStrategiesListItem/ScheduleStrategiesListItem";

// import { StrategiesMigrate } from "./StrategiesMigrate";

const Wrapper = styled.div`
  width: 100%;
  border-top: 1px solid #d9d9d9;
`;

interface ScheduleStrategiesListProps {
  displayType: DisplayType;
}

const ScheduleStrategiesList = ({ displayType }: ScheduleStrategiesListProps) => {
  const strategies = useRecoilValue(selectedStrategiesAtom);
  // const { isLoading } = useRecoilValue(apiStatusAtom("GET_STRATEGIES"));

  // if (!isLoading && strategies.length === 0) return <StrategiesMigrate />;

  if (strategies.length === 0 || !displayType) return null;

  if (displayType === DisplayType.DAYS) {
    return (
      <Wrapper>
        {strategies.map((item) => (
          <ScheduleStrategiesListItem
            strategy={item as ServiceRangeStrategy}
            key={`strategy-${item.strategyId}`}
            displayType={displayType}
          />
        ))}
      </Wrapper>
    );
  }

  if (displayType === DisplayType.CALENDAR) {
    return (
      <Wrapper>
        {strategies.map((item) => (
          <ScheduleStrategiesListItem
            strategy={item as ServiceDayRangeStrategy}
            key={`strategy-${item.strategyId}`}
            displayType={displayType}
          />
        ))}
      </Wrapper>
    );
  }

  if (displayType === DisplayType.LIST) {
    return (
      <Wrapper>
        {strategies.map((item) => (
          <ScheduleStrategiesListItem
            strategy={item as ServiceOnceStrategy}
            key={`strategy-${item.strategyId}`}
            displayType={displayType}
          />
        ))}
      </Wrapper>
    );
  }

  return null;
};

export default ScheduleStrategiesList;
