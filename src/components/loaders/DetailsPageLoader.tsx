import React from "react";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import styled, { css } from "styled-components";
import { Spinner } from "./Spinner";

const StyledWrapper = styled.div<{ isAbsolute: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > .loader {
    flex-grow: 1;
  }

  position: ${({ isAbsolute }) => {
    return isAbsolute ? "absolute" : "block";
  }};

  ${({ isAbsolute }) => {
    if (!isAbsolute) return "";

    return css`
      width: 100%;
      height: 100%;
      background-color: #00000073;
      z-index: 1000;
    `;
  }};
`;

export const DetailsPageLoader: React.FC<{ absolute?: boolean }> = ({ absolute = false }) => {
  return (
    <StyledWrapper isAbsolute={absolute}>
      <Row mt={20} jc="center" ai={absolute ? "flex-start" : "center"} className="loader">
        <Column>
          <Spinner />
          <Typography typographyType="body">Loading...</Typography>
        </Column>
      </Row>
    </StyledWrapper>
  );
};
