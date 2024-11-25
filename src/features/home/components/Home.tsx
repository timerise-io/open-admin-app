import React from "react";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { PageContent } from "components/layout/PageContent";
import { PageHeader } from "components/layout/PageHeader";
import { currentUserAtom } from "features/auth/state/currentUserAtom";
import { selectedProjectSelector } from "features/project/state/selectedProjectSelector";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useHostDashboard } from "../hooks/useHostDashboard";
import AdminDashboard from "./AdminDashboard";
import MyBookings from "./MyBookings/MyBookings";

const HiTypography = styled(Typography)`
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 34px;
  margin-bottom: 46px;
`;

const Home = () => {
  const { t } = useTranslation();
  useHostDashboard();
  const project = useRecoilValue(selectedProjectSelector);
  const user = useRecoilValue(currentUserAtom);

  if (project === undefined || user === undefined) return null;

  return (
    <>
      <PageHeader title={`${t("common:dashboard.home")} - ${project.title}`} />
      <PageContent>
        <HiTypography typographyType="body" as="span">
          {`${t("common:dashboard.hi")}, ${user.fullName} 👋`}
        </HiTypography>
        <MyBookings />
        <AdminDashboard />
        <Column gap="20px" ai="flex-start"></Column>
      </PageContent>
    </>
  );
};

export default Home;
