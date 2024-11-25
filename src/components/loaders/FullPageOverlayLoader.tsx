import React from "react";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Spinner } from "./Spinner";

const StyledWrapper = styled.div`
  position: relative;
  z-index: 1000;

  & > div {
    display: grid;
    place-items: center;
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: #00000073;
    z-index: 1000;
  }

  & > div > .loader {
    padding: 25px 48px 12px 48px;
    background: #ffffff;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
`;

export const FullPageOverlayLoader = () => {
  return ReactDOM.createPortal(
    <StyledWrapper>
      <div>
        <Column className="loader">
          <Spinner />
          <Typography typographyType="body">Loading...</Typography>
        </Column>
      </div>
    </StyledWrapper>,
    document.getElementById("full-page-overlay-loader")!,
  );
};
