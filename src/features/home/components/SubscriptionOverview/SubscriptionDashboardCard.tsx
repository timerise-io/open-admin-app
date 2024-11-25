import React from "react";
import { Typography } from "components/Typography";
import styled from "styled-components";

const Wrapper = styled.div`
  flex-grow: 1;
  max-width: 438px;
  /* cursor: pointer; */
`;

const StyledCard = styled.div`
  margin-top: 4px;
  height: 70px;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 23px 0 20px;
`;

const TextTypography = styled(Typography)`
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
`;

interface SubscriptionDashboardCardProps {
  label: string;
  text: string;
  secondaryText: string;
}

const SubscriptionDashboardCard: React.FC<SubscriptionDashboardCardProps> = ({ label, text, secondaryText }) => {
  return (
    <Wrapper>
      <Typography typographyType="label" as="span">
        {label}
      </Typography>
      <StyledCard>
        <TextTypography typographyType="body" as="span">
          {text}
        </TextTypography>
        <Typography typographyType="h2" as="span">
          {secondaryText}
        </Typography>
        {/* <IconChevronRight size={23} /> */}
      </StyledCard>
    </Wrapper>
  );
};

export default SubscriptionDashboardCard;
