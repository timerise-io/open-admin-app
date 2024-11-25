import React, { PropsWithChildren } from "react";
import { Typography } from "components/Typography";
import styled, { css } from "styled-components";
import { Row } from "./Row";

const Wrapper = styled.h3`
  margin: 0;
  height: 50px;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 500;

  ${({ theme }) => {
    return css`
      background-color: ${theme.colorSchemas.background.primary.color};
    `;
  }}
`;

interface PageSubheaderProps {
  title: string;
}

export const PageSubheader: React.FC<PropsWithChildren<PageSubheaderProps>> = ({ title, children }) => {
  return (
    <Wrapper>
      <Row>
        <Typography typographyType="h2" as="h2" displayType="contents">
          {title}
        </Typography>
      </Row>
      <div>{children}</div>
    </Wrapper>
  );
};
