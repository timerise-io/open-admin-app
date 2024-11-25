import React from "react";
import { StyledLink } from "components/StyledLink";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IconInfoCircle } from "@tabler/icons";

const Wrapper = styled.div`
  width: 334px;
  padding: 12px;
  background: #e6e6e6;
  border-radius: 4px;
  display: flex;
  gap: 8px;

  & > .info-icon {
    min-width: 20px;
  }
`;

const AddServiceInfoCard = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <IconInfoCircle size={20} className="info-icon" />
      <Column ai="flex-start" gap="6px">
        <Typography typographyType="body" as="span">
          {t("services.add-via-api")}
        </Typography>
        <StyledLink href="https://docs.timerise.io/" target="_blank">
          <Typography typographyType="body" as="span">
            {t("learn-more")}
          </Typography>
        </StyledLink>
      </Column>
    </Wrapper>
  );
};

export default AddServiceInfoCard;
