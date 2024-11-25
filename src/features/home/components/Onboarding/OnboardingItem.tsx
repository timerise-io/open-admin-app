import React from "react";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { ROUTES } from "constans/routes";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { IconCircle, IconCircleCheck, IconCircleDashed, IconRotateDot } from "@tabler/icons";

const Description = styled(Typography)`
  padding-left: 30px;
`;

const Wrapper = styled(Column)<{ isBlocked: boolean }>`
  ${({ isBlocked }) => {
    if (!isBlocked) {
      return "";
    }

    return css`
      color: #d9d9d9;
    `;
  }}
`;

const StyledLink = styled(NavLink)`
  all: unset;
  display: flex;
  cursor: pointer;
  padding-left: 30px;
  font-style: normal;
  display: block;
  text-align: unset;
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.25rem;
  color: #333333;

  ${({ theme }) => {
    return css`
      &:hover {
        text-decoration: underline;
      }
    `;
  }};
`;

const icons = {
  todo: <IconCircle size="20px" />,
  "in-progress": <IconRotateDot />,
  completed: <IconCircleCheck />,
  blocked: <IconCircleDashed />,
};

interface OnboardingItemProps {
  title: string;
  description: string;
  state: "todo" | "in-progress" | "completed" | "blocked";
}

const OnboardingItem: React.FC<OnboardingItemProps> = ({ title, description, state }) => {
  return (
    <Wrapper ai="flex-start" isBlocked={state === "blocked"} gap="10px" mt={2}>
      <Row gap="10px">
        {icons[state]}
        <Typography typographyType="h3" as="h3" color="inherit" displayType="contents">
          {title}
        </Typography>
      </Row>
      {state === "todo" && (
        <Description typographyType="body" as="span">
          {description}
        </Description>
      )}
      {state === "todo" && <StyledLink to={ROUTES.serviceAdd}>To complete the point above click here</StyledLink>}
    </Wrapper>
  );
};

export default OnboardingItem;
