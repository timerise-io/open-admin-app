import React from "react";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { PageContent } from "components/layout/PageContent";
import { PageHeader } from "components/layout/PageHeader";
import { Spinner } from "components/loaders/Spinner";
import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import { currentUserAtom } from "features/auth/state/currentUserAtom";
import { TeamMemberRole } from "features/team/components/TeamMemberInvite/TeamMemberInviteFormContent";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useBilling } from "../hooks/useBilling";
import { billingAtom } from "../state/billingAtom";

const SpinnerWrapper = styled.div`
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

const Billing = () => {
  const { t } = useTranslation();
  useBilling();
  const billingUrl = useRecoilValue(billingAtom);
  const requestStatus = useRecoilValue(apiStatusAtom("BILLING"));
  const user = useRecoilValue(currentUserAtom);

  if (user?.role === TeamMemberRole.STAFF) {
    return null;
  }

  return (
    <>
      <PageHeader title={t("billing")}></PageHeader>
      <PageContent>
        <Column ai="flex-start">
          <Typography typographyType="body">
            Click the button below to open and edit your current subscription plan.
          </Typography>
          <Box w="123px">
            <Button
              buttonType="secondary"
              onClick={() => {
                window.open(billingUrl, "_blank");
              }}
              disabled={!billingUrl}
            >
              {requestStatus.isLoading ? (
                <SpinnerWrapper>
                  <Spinner />
                </SpinnerWrapper>
              ) : (
                "Open my billing"
              )}
            </Button>
          </Box>
        </Column>
      </PageContent>
    </>
  );
};

export default Billing;
