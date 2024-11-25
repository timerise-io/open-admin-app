import React from "react";
import { Card } from "components/Card";
import { DisplayField } from "components/DisplayField";
import { Typography } from "components/Typography";
import FormSelect from "components/forms/FormSelect";
import TextField from "components/forms/TextField";
import { Row } from "components/layout/Row";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { PROVIDERS } from "./enums/providers";
import { PROVIDERS_WITHOUT_LINK } from "./states";

const StyledHeader = styled(Typography)`
  margin-top: 32px;
`;

export const spaceProviders = {
  TIMERISE: "Timerise Space (powered by Daily)",
  AMAZON_CHIME: "Amazon Chime",
  FACEBOOK_SPACES: "Facebook Spaces",
  GOOGLE_MEET: "Google Meet",
  GOTO_MEETING: "Goto Meeting",
  JOIN_ME: "Join.me",
  SKYPE: "Skype",
  TEAMS: "Teams",
  WEBEX: "Webex",
  WHEREBY: "Whereby",
  ZOHO_MEETING: "Zoho Meeting",
  ZOOM: "Zoom",
  OTHER: "Other",
};

export interface SpaceFormValues {
  provider: string;
  url: string;
  title?: string;
  instructions?: string;
}

const SpaceFormContent = (values: { systemId?: string; shortId?: string; provider?: string }) => {
  const { t } = useTranslation();
  return (
    <>
      <StyledHeader typographyType="h3" as="h3">
        {t("details")}
      </StyledHeader>
      <Card>
        {values.systemId && values.shortId && (
          <Row gap="10px">
            <DisplayField label={t("spaces.space-id")} text={values.systemId} showCopyButton />
            <DisplayField label={t("short-id")} text={values.shortId} showCopyButton />
          </Row>
        )}
        <FormSelect
          name="provider"
          options={spaceProviders}
          label={t("spaces.provider")}
          disabled={Boolean(values?.systemId)}
        />

        {!PROVIDERS_WITHOUT_LINK.includes(values.provider as PROVIDERS) && (
          <TextField name="url" label={t("link")} showCopyButton={true} />
        )}

        <TextField name="title" label={t("forms.titleField")} />
        <TextField name="instructions" multiline label={t("spaces.instructions")} />
      </Card>
    </>
  );
};

export default SpaceFormContent;
