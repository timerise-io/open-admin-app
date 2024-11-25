import React, { useCallback, useRef, useState } from "react";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { ROUTES } from "constans/routes";
import { firebaseAuth } from "firebase-config/connection";
import useOnClickOutside from "helpers/hooks/useOnClickOutside";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { useTranslation } from "react-i18next";
import { Link, generatePath } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled, { css } from "styled-components";
import { IconChevronUp } from "@tabler/icons";
import { currentUserAtom } from "../state/currentUserAtom";
import { Avatar } from "./Avatar";

const Wrapper = styled.div`
  position: relative;
`;

const WrapperButton = styled.button`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
  margin: 2px 16px;
  border-radius: 4px;
  position: relative;
  width: -webkit-fill-available;

  ${({ theme }) => {
    return css`
      &:hover {
        background-color: #f6f6f6;
      }
    `;
  }};
`;

const StyledRow = styled(Row)`
  margin: 8px 12px;
`;

const StyledColumn = styled(Column)`
  margin-left: 8px;
  flex-grow: 1;
  max-width: 128px;

  & > span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 128px;
  }
`;

const EmailTypography = styled(Typography)`
  color: #999999;
`;

const ModalMenuWrapper = styled(Column)`
  min-width: 230px;
  position: absolute;
  z-index: 1000;
  padding: 8px 16px;
  top: 15px;
  right: 30px;
  transform: translate(100%, -100%);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  gap: 4px;
  ${({ theme }) => {
    return css`
      background-color: ${theme.colorSchemas.background.secondary.color};
    `;
  }};
`;

const HorizontalSplit = styled.div`
  height: 1px;
  width: 100%;
  background-color: #e7e7e7;
`;

const ModalButton = styled(WrapperButton)`
  margin: 0;
  padding: 8px 12px;
`;

const StyledLink = styled(Link)`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
  margin: 2px 16px;
  border-radius: 4px;
  position: relative;
  width: -webkit-fill-available;

  ${({ theme }) => {
    return css`
      &:hover {
        background-color: #f6f6f6;
      }
    `;
  }};
  margin: 0;
  padding: 8px 12px;
`;

const StyledLinkTag = styled.a`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
  margin: 2px 16px;
  border-radius: 4px;
  position: relative;
  width: -webkit-fill-available;

  ${({ theme }) => {
    return css`
      &:hover {
        background-color: #f6f6f6;
      }
    `;
  }};
  margin: 0;
  padding: 8px 12px;
`;

const PhotoMiniature = styled.img`
  object-fit: cover;
  height: 32px;
  min-height: 32px;
  width: 32px;
  min-width: 32px;
  border-radius: 50%;
  overflow: hidden;
`;

export const ProfileMiniature = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const whitelabel = useWhitelabel();
  const currentUser = useRecoilValue(currentUserAtom);
  const ref = useRef<HTMLDivElement>(null);
  const memoizedCallback = useCallback(() => setIsOpen(false), []);
  useOnClickOutside(ref, memoizedCallback);

  if (!currentUser) return null;

  return (
    <Wrapper ref={ref}>
      <WrapperButton onClick={() => setIsOpen(!isOpen)}>
        <StyledRow>
          {currentUser.photoUrl === "" ? (
            <Avatar text={currentUser.fullName} />
          ) : (
            <PhotoMiniature src={currentUser.photoUrl} alt={currentUser.fullName} />
          )}
          <StyledColumn ai="flex-start">
            <Typography typographyType="body" as="span">
              {currentUser.fullName}
            </Typography>
            <EmailTypography typographyType="label" as="span">
              {currentUser.email}
            </EmailTypography>
          </StyledColumn>
          <IconChevronUp size={16} />
        </StyledRow>
      </WrapperButton>
      {isOpen && (
        <ModalMenuWrapper onClick={() => setIsOpen(!isOpen)}>
          <StyledLink to={generatePath(ROUTES.teamMe)}>
            <Typography typographyType="body" as="span">
              {t("my-account")}
            </Typography>
          </StyledLink>
          <HorizontalSplit />
          {whitelabel.timeriseLinks === true && (
            <>
              <StyledLinkTag href={"https://intercom.help/timerise/"} target="_blank" rel="noreferrer">
                <Typography typographyType="body" as="span">
                  {t("help-center")}
                </Typography>
              </StyledLinkTag>
              <StyledLinkTag href={"https://docs.timerise.io/"} target="_blank" rel="noreferrer">
                <Typography typographyType="body" as="span">
                  {t("documentation")}
                </Typography>
              </StyledLinkTag>
              <StyledLinkTag
                href={
                  process.env.REACT_APP_APOLLO_EXPLORER ??
                  "https://studio.apollographql.com/public/TIMERISE-API/explorer?variant=production"
                }
                target="_blank"
                rel="noreferrer"
              >
                <Typography typographyType="body" as="span">
                  {t("apollor-explorer")}
                </Typography>
              </StyledLinkTag>
              <StyledLinkTag href="https://timerise.io/" target="_blank" rel="noreferrer">
                <Typography typographyType="body" as="span">
                  {t("timerise-website")}
                </Typography>
              </StyledLinkTag>
              <HorizontalSplit />
            </>
          )}
          <ModalButton
            onClick={() => {
              localStorage.clear();
              firebaseAuth.signOut();
            }}
          >
            <Typography typographyType="body" as="span">
              {t("log-out")}
            </Typography>
          </ModalButton>
        </ModalMenuWrapper>
      )}
    </Wrapper>
  );
};
