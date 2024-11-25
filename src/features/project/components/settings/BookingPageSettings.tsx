import React, { useEffect, useState } from "react";
import { Button } from "components/Button";
import { Card } from "components/Card";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { PageContent } from "components/layout/PageContent";
import { PageHeader } from "components/layout/PageHeader";
import { Row } from "components/layout/Row";
import { currentUserAtom } from "features/auth/state/currentUserAtom";
import { useUpdateProject } from "features/project/hooks/useUpdateProject";
import { projectsAtom } from "features/project/state/projectsAtom";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { TeamMemberRole } from "features/team/components/TeamMemberInvite/TeamMemberInviteFormContent";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { BookingPageLogo } from "./BookingPageLogo";
import { BookingPageThemePicker } from "./BookingPageThemePicker";

const StyledRow = styled(Row)`
  gap: 10px;
`;

export const BookingPageSettings = () => {
  const { t } = useTranslation();
  const selectedProjectId = useRecoilValue(selectedProjectAtom);
  const projects = useRecoilValue(projectsAtom);
  const currentProject = projects?.[selectedProjectId ?? ""];
  const currentTheme = currentProject?.theme;
  const currentLogoUrl = currentProject?.logoUrl;
  const [theme, setTheme] = useState<"LIGHT" | "DARK" | undefined>(currentTheme);
  const [logoUrl, setLogoUrl] = useState<string | undefined>(currentLogoUrl);
  const updateTheme = useUpdateProject();
  const user = useRecoilValue(currentUserAtom);

  useEffect(() => {
    if (theme === undefined) {
      setTheme(currentTheme);
    }
  }, [currentTheme, theme]);

  useEffect(() => {
    setTheme(currentTheme);
  }, [currentTheme, selectedProjectId]);

  if (user?.role === TeamMemberRole.STAFF) {
    return null;
  }

  return (
    <div>
      <PageHeader title={t("booking-page")}>
        <StyledRow>
          <Button
            buttonType="secondary"
            onClick={() => {
              setTheme(currentTheme);
            }}
            disabled={currentTheme === theme}
          >
            {t("discard")}
          </Button>
          <Button
            buttonType="primary"
            disabled={currentTheme === theme && currentLogoUrl === logoUrl}
            onClick={() => {
              selectedProjectId &&
                theme &&
                updateTheme({
                  projectId: selectedProjectId,
                  theme,
                  logoUrl,
                });
            }}
          >
            {t("save")}
          </Button>
        </StyledRow>
      </PageHeader>
      <PageContent>
        <Column w="530px" ai="flex-start">
          <BookingPageLogo logoUrl={currentLogoUrl ?? ""} onChange={(newLogoUrl) => setLogoUrl(newLogoUrl)} />
          {theme && (
            <>
              <Typography typographyType="h3" as="h3">
                {t("theme")}
              </Typography>
              <Card>
                <BookingPageThemePicker theme={theme} onChange={(newTheme) => setTheme(newTheme)} />
              </Card>
            </>
          )}
        </Column>
      </PageContent>
    </div>
  );
};
