import React from "react";
import { Card } from "components/Card";
import { DisplayField } from "components/DisplayField";
import { Typography } from "components/Typography";
import { Row } from "components/layout/Row";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledHeader = styled(Typography)`
  margin-top: 32px;
`;

interface IdsCardProps {
  shortId?: string;
  systemId?: string;
  label?: string;
}

const IdsCard = ({ shortId, systemId, label }: IdsCardProps) => {
  const { t } = useTranslation();
  return (
    <>
      <StyledHeader typographyType="h3" as="h3">
        IDs
      </StyledHeader>
      <Card>
        <Row gap="10px">
          <DisplayField label={label || "System ID"} text={systemId} showCopyButton disableBottomMargin />
          <DisplayField label={t("common:short-id")} text={shortId} showCopyButton disableBottomMargin />
        </Row>
      </Card>
    </>
  );
};

export default IdsCard;
