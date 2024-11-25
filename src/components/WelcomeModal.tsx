import React, { useState } from "react";
import { ROUTES } from "constans/routes";
import { generatePath, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IconArrowUpRight } from "@tabler/icons";
import { currentUserAtom } from "../features/auth/state/currentUserAtom";
import { Button } from "./Button";
import { ContextButton } from "./ContextButton";
import { Typography } from "./Typography";
import { Column } from "./layout/Column";
import { Row } from "./layout/Row";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #00000063;
  z-index: 2000;
  display: grid;
  place-items: center;
`;

const ModalCard = styled.div`
  position: relative;
  width: 660px;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 20px;
  padding-bottom: 108px;
`;

const StyledColumn = styled(Column)`
  gap: 24px;
`;

const StyledRow = styled(Row)`
  gap: 20px;
  width: 100%;
  background: #ffffff;
`;
const StyledHeaderRow = styled(Row)`
  gap: 20px;
  width: 100%;
  background: #ffffff;
  margin-bottom: -12px;
`;
const StyledButton = styled(ContextButton)`
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const StyledRowBottom = styled(Row)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 20px;
  width: 100%;
  background: #f6f6f6;
`;

const CloseButton = styled(Button)`
  width: unset;
`;

const WelcomeModal = () => {
  const navigate = useNavigate();
  //const [isClosed, setIsClosed] = useState(!!localStorage.getItem("WelcomeModalClosed"));
  const [isClosed, setIsClosed] = useState(true);
  const currentUser = useRecoilValue(currentUserAtom);

  const closeModal = () => {
    localStorage.setItem("WelcomeModalClosed", "true");
    setIsClosed(true);
  };

  if (isClosed) return null;

  return (
    <Wrapper>
      <ModalCard>
        <StyledColumn ai="flex-start">
          <Typography typographyType="h3" as="h3" displayType="contents">
            Welcome to Timerise 👋
          </Typography>
          <Typography typographyType="body" as="span">
            Here are a couple of links to help you get started with Timerise. They are available by clicking on your
            profile, so you will have them at hand.
          </Typography>
          <StyledHeaderRow>
            <Typography typographyType="body" as="span">
              Start here 🚀
            </Typography>
          </StyledHeaderRow>
          <StyledRow>
            <StyledButton
              onClick={() => {
                closeModal();
                navigate(ROUTES.projectSettings);
              }}
            >
              Set up project
            </StyledButton>
            <StyledButton
              onClick={() => {
                closeModal();
                navigate(ROUTES.serviceAdd);
              }}
            >
              Create a service
            </StyledButton>
            <StyledButton
              onClick={() => {
                closeModal();
                navigate(
                  generatePath(ROUTES.teamMember, {
                    id: currentUser?.userId!,
                  }),
                );
              }}
            >
              Complete my profile
            </StyledButton>
          </StyledRow>
          <StyledHeaderRow>
            <Typography typographyType="body" as="span">
              For developers 💻
            </Typography>
          </StyledHeaderRow>
          <StyledRow>
            <StyledButton onClick={() => window.open("http://docs.timerise.io", "_blank")}>
              <Row>
                Documentation
                <IconArrowUpRight size={20} />
              </Row>
            </StyledButton>
            <StyledButton
              onClick={() =>
                window.open(
                  process.env.REACT_APP_APOLLO_EXPLORER ??
                    "https://studio.apollographql.com/public/TIMERISE-API/explorer?variant=production",
                  "_blank",
                )
              }
            >
              <Row>
                Apollo Explorer
                <IconArrowUpRight size={20} />
              </Row>
            </StyledButton>
            <StyledButton onClick={() => window.open("https://sandbox.timerise.io", "_blank")}>
              <Row>
                Sandbox environment
                <IconArrowUpRight size={20} />
              </Row>
            </StyledButton>
          </StyledRow>
          <StyledRowBottom mt={2.5} jc="flex-end">
            <CloseButton
              buttonType="primary"
              onClick={() => {
                closeModal();
              }}
            >
              Let's start
            </CloseButton>
          </StyledRowBottom>
        </StyledColumn>
      </ModalCard>
    </Wrapper>
  );
};

export default WelcomeModal;
