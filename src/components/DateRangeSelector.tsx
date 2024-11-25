import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Button } from "./Button";
import { Typography } from "./Typography";
import { Row } from "./layout/Row";

const ButtonWrapper = styled(Row)`
  margin-left: 8px;
  padding: 4px;
  background: #ffffff;
  border-radius: 4px;
`;

const StyledButton = styled(Button)`
  padding: 3px 7px;
`;

type SelectedRange = "today" | "week" | "month" | "all";

export const DateRangeSelector = () => {
  const { t } = useTranslation();
  const [selectedRange, setSelectedRange] = useState<SelectedRange>("today");

  return (
    <Row jc="flex-start">
      <Typography typographyType="body">Date:</Typography>
      <ButtonWrapper>
        <StyledButton
          buttonType="secondary"
          checked={selectedRange === "today"}
          onClick={() => setSelectedRange("today")}
        >
          {t("today")}
        </StyledButton>
        <StyledButton
          buttonType="secondary"
          checked={selectedRange === "week"}
          onClick={() => setSelectedRange("week")}
        >
          {t("week")}
        </StyledButton>
        <StyledButton
          buttonType="secondary"
          checked={selectedRange === "month"}
          onClick={() => setSelectedRange("month")}
        >
          {t("month")}
        </StyledButton>
        <StyledButton buttonType="secondary" checked={selectedRange === "all"} onClick={() => setSelectedRange("all")}>
          {t("all")}
        </StyledButton>
      </ButtonWrapper>
    </Row>
  );
};
