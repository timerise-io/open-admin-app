import React from "react";
import { Card } from "components/Card";
import { DisplayField } from "components/DisplayField";
import { Typography } from "components/Typography";
import FormSelect from "components/forms/FormSelect";
import IntField from "components/forms/IntField";
import MediaField from "components/forms/MediaField";
import TextField from "components/forms/TextField";
import { Row } from "components/layout/Row";
import { locationsOptionsSelector } from "features/locations/state/locationsOptionsSelector";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const StyledHeader = styled(Typography)`
  margin-top: 32px;
`;

export interface AssetFormContentProps {
  title: string;
  description: string;
  quantity: number;
  media: Array<string>;
  location: string;
}

const AssetFormContent = (values: { systemId?: string; shortId?: string }) => {
  const { t } = useTranslation();
  const locationsOptions = useRecoilValue(locationsOptionsSelector);

  return (
    <>
      <StyledHeader typographyType="h3" as="h3">
        {t("details")}
      </StyledHeader>
      <Card>
        {values.systemId && values.shortId && (
          <Row gap="10px">
            <DisplayField label="Asset ID" text={values.systemId} showCopyButton />
            <DisplayField label={t("common:short-id")} text={values.shortId} showCopyButton />
          </Row>
        )}
        <TextField name="title" />
        <TextField name="description" multiline />
        <IntField name="quantity" />
        <MediaField name="media" label={t("photos-optional")} />
        <FormSelect
          label={t("locations.location")}
          name="location"
          options={locationsOptions}
          hideErrors
          additionalOptions={{ None: t("none") }}
        />
      </Card>
    </>
  );
};

export default AssetFormContent;
