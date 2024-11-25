import React from "react";
import { Card } from "components/Card";
import { DisplayField } from "components/DisplayField";
import { Typography } from "components/Typography";
import MediaField from "components/forms/MediaField";
import TextField from "components/forms/TextField";
import { Row } from "components/layout/Row";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledHeader = styled(Typography)`
  margin-top: 32px;
`;

export interface LocationFormValues {
  title: string;
  description: string;
  media: Array<string>;
  address: string;
}

const LocationFormContent = (values: { systemId?: string; shortId?: string }) => {
  const { t } = useTranslation();
  return (
    <>
      <StyledHeader typographyType="h3" as="h3">
        {t("details")}
      </StyledHeader>
      <Card>
        {values.systemId && values.shortId && (
          <Row gap="10px">
            <DisplayField label={t("locations.location-id")} text={values.systemId} showCopyButton />
            <DisplayField label={t("short-id")} text={values.shortId} showCopyButton />
          </Row>
        )}
        <TextField name="title" />
        <TextField name="description" multiline />
        <MediaField name="media" label={t("photos-optional")} />
        <TextField name="address" />
      </Card>
    </>
  );
};

export default LocationFormContent;
