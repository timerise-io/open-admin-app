import React, { useEffect, useState } from "react";
import Radio from "components/Radio";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useServiceSlotDisplayUpdate } from "features/services/hooks/useServiceSlotDisplayUpdate";
import { selectedServiceAtom } from "features/services/state/selectedServiceAtom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const ImgWrapper = styled.div`
  margin-top: 12px;
  position: relative;
  cursor: pointer;

  .checked-option {
    border: 1px solid #333333;
    border-radius: 4px;
  }
`;

const SlotsDisplayPicker = () => {
  const { mutation } = useServiceSlotDisplayUpdate();
  const service = useRecoilValue(selectedServiceAtom);
  const projectId = useRecoilValue(selectedProjectAtom);
  const [showDuration, setShowDuration] = useState(!!service?.viewConfig?.days?.duration);

  useEffect(() => {
    setShowDuration(!!service?.viewConfig?.days?.duration);
  }, [service?.viewConfig?.days?.duration, setShowDuration]);

  const showDurationHandle = (value: boolean) => {
    if (service === undefined || projectId === undefined) return;

    mutation({
      serviceId: service.serviceId,
      projectId: projectId,
      viewConfig: {
        displayType: service.viewConfig.displayType,
        days: {
          duration: value,
          quantity: value,
          multiSelect: value,
        },
        calendar: {
          quantity: value,
          rangeSelect: value,
          multiSelect: value,
        },
        list: {
          duration: value,
          quantity: value,
          multiSelect: value,
          showTime: value,
        },
        preorder: {
          duration: value,
          quantity: value,
          showDate: value,
          showTime: value,
        },
        theme: service.viewConfig.theme,
      },
    });
    setShowDuration(value);
  };

  return (
    <Row jc="flex-start" gap="10px">
      <Column w="220px" ai="flex-start">
        <Radio
          label="Starting hour only"
          onClick={() => {
            showDurationHandle(false);
          }}
          checked={showDuration === false}
        />
        <ImgWrapper
          onClick={() => {
            showDurationHandle(false);
          }}
        >
          <img
            className={!showDuration ? "checked-option" : ""}
            src="https://cdn.timerise.io/app/service/start.png"
            width="180"
            height="100"
            alt="slot start time"
          />
        </ImgWrapper>
      </Column>
      <Column w="220px" ai="flex-start">
        <Radio
          label="Range"
          onClick={() => {
            showDurationHandle(true);
          }}
          checked={showDuration}
        />
        <ImgWrapper
          onClick={() => {
            showDurationHandle(true);
          }}
        >
          <img
            className={showDuration ? "checked-option" : ""}
            src="https://cdn.timerise.io/app/service/range.png"
            width="180"
            height="100"
            alt="slot range"
          />
        </ImgWrapper>
      </Column>
    </Row>
  );
};

export default SlotsDisplayPicker;
