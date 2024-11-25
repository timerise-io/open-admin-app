import React from "react";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Spinner } from "./Spinner";

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

  & > .loader {
    flex-grow: 1;
  }
`;

export const FullPageLoader = () => {
  const { t } = useTranslation();
  return ReactDOM.createPortal(
    <StyledWrapper>
      <Row mb={20} jc="center" className="loader">
        <Column>
          <Spinner />
          <Typography typographyType="body">{t("loading")}</Typography>
        </Column>
      </Row>
    </StyledWrapper>,
    document.getElementById("full-page-loader")!,
  );
};
