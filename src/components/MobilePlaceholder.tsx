import React from "react";
import styled from "styled-components";
import { Typography } from "./Typography";
import { Column } from "./layout/Column";
import { Row } from "./layout/Row";

const StyledWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > img {
    margin: 32px 0;
    height: 18px;
  }

  @media (min-width: 1000px) {
    display: none;
  }
`;

const MobilePlaceholder = () => {
  return (
    <StyledWrapper>
      <Row mb={20} mt={6} jc="center" className="loader">
        <Column p={2}>
          <Typography typographyType="body">
            We’re sorry but app is not yet available for mobile. For the full experience, go to the desktop version.
          </Typography>
        </Column>
      </Row>
    </StyledWrapper>
  );
};

export default MobilePlaceholder;
