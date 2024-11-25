import React, { PropsWithChildren } from "react";
import { Card } from "components/Card";
import { ContextButton } from "components/ContextButton";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { PageContent } from "components/layout/PageContent";
import { PageHeader } from "components/layout/PageHeader";
import { Row } from "components/layout/Row";
import { DetailsPageLoader } from "components/loaders/DetailsPageLoader";
import { Spinner } from "components/loaders/Spinner";
import { ROUTES } from "constans/routes";
import { currentUserAtom } from "features/auth/state/currentUserAtom";
import { useCalendarAuthUrl } from "features/team/hooks/useCalendarAuthUrl";
import { useTeamMember } from "features/team/hooks/useTeamMember";
import { selectedTeamMemberAtom } from "features/team/state/selectedTeamMember";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import CalendarsList from "./CalendarsList";

const SectionWrapperRow = styled(Row)`
  gap: 32px;
  align-items: flex-start;
  justify-content: flex-start;
`;

const DetailColumn = styled(Column)`
  justify-content: flex-start;
  align-items: flex-start;
`;

const StyledHeader = styled(Typography)`
  margin-top: 32px;
`;

const AuthButton = styled(ContextButton)`
  min-width: 138px;
  display: flex;
  gap: 21px;
  align-items: center;
  color: rgba(0, 0, 0, 0.54);
  font-family: "Yantramanav";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  background: #ffffff;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.24);
  border-radius: 2px;
  border: none;
  & > img {
    height: 18px;
    width: 18px;
  }

  &:hover {
    border: none;
    background: #f6f6f6;
  }
`;

const SpinnerWrapper = styled.div`
  margin: auto;
  position: relative;
  min-height: 15px;
  max-height: 15px;
  display: flex;
  justify-content: center;

  & > div {
    position: absolute;
    top: -4px;
  }
`;

type ConnectionsProps = PropsWithChildren & {
  memberId: string;
};

const Connections: React.FC<ConnectionsProps> = ({ children, memberId }) => {
  const { t } = useTranslation();
  const id = memberId;
  useTeamMember(id!);
  const teamMember = useRecoilValue(selectedTeamMemberAtom);
  const isCurrentUser = useRecoilValue(currentUserAtom)?.userId === id;
  const navigate = useNavigate();

  const { data, loading } = useCalendarAuthUrl();

  if (teamMember === undefined)
    return (
      <PageContent>
        <DetailsPageLoader />
      </PageContent>
    );

  return (
    <>
      <PageHeader
        title={`${teamMember.fullName}${isCurrentUser ? " (Me)" : ""}`}
        onBackButonClick={() => {
          navigate(ROUTES.team);
        }}
        showBackButton
      ></PageHeader>
      <PageContent>
        {children}
        <SectionWrapperRow>
          <DetailColumn w="530px">
            <StyledHeader typographyType="h3" as="h3">
              Google
            </StyledHeader>
            <Card>
              <Column gap="20px" ai="flex-start">
                <Typography typographyType="body" as="span">
                  {t("common:team.sign-in-with-google-info")}
                </Typography>
                {data?.calendarsAuthUrl && !loading && (
                  <AuthButton
                    onClick={() => {
                      data?.calendarsAuthUrl && window.open(data.calendarsAuthUrl, "_self");
                    }}
                    type="button"
                    disabled={!data?.calendarsAuthUrl}
                  >
                    {loading ? (
                      <SpinnerWrapper>
                        <Spinner />
                      </SpinnerWrapper>
                    ) : (
                      <>
                        <img src="https://cdn.timerise.io/app/google_logo.png" width="20" height="20" alt="google" />
                        {t("common:team.sign-in-with-google")}
                      </>
                    )}
                  </AuthButton>
                )}
                <CalendarsList />
              </Column>
            </Card>
          </DetailColumn>
        </SectionWrapperRow>
      </PageContent>
    </>
  );
};

export default Connections;
