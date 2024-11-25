import React from "react";
import { Card } from "components/Card";
import { Typography } from "components/Typography";
import FormTimeSelect from "components/forms/FormTimeSelect/FormTimeSelect";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledHeader = styled(Typography)`
  margin-top: 16px;
`;

interface WorkingDaysColumnProps {
  title?: string;
}

const Wrapper = styled.div<{}>`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

const WorkingDaysColumn = ({ title = "Working Hours" }: WorkingDaysColumnProps) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <StyledHeader typographyType="h3" as="h3">
        {title}
      </StyledHeader>
      <Card>
        <Column ai="flex-start" gap="0px">
          <Row gap="5px">
            <FormTimeSelect name="mondayFrom" label={t("common:monday-from")} />
            -
            <FormTimeSelect name="mondayTo" label={t("common:to")} />
          </Row>
          <Row gap="5px">
            <FormTimeSelect name="tuesdayFrom" label={t("common:tuesday-from")} />
            -
            <FormTimeSelect name="tuesdayTo" label={t("common:to")} />
          </Row>
          <Row gap="5px">
            <FormTimeSelect name="wendsdayFrom" label={t("common:wednesday-from")} />
            -
            <FormTimeSelect name="wendsdayTo" label="to" />
          </Row>
          <Row gap="5px">
            <FormTimeSelect name="thursdayFrom" label={t("common:thursday-from")} />
            -
            <FormTimeSelect name="thursdayTo" label="to" />
          </Row>
          <Row gap="5px">
            <FormTimeSelect name="fridayFrom" label={t("common:friday-from")} />
            -
            <FormTimeSelect name="fridayTo" label="to" />
          </Row>
          <Row gap="5px">
            <FormTimeSelect name="saturdayFrom" label={t("common:saturday-from")} />
            -
            <FormTimeSelect name="saturdayTo" label="to" />
          </Row>
          <Row gap="5px">
            <FormTimeSelect name="sundayFrom" label={t("common:sunday-from")} />
            -
            <FormTimeSelect name="sundayTo" label="to" />
          </Row>
        </Column>
      </Card>
    </Wrapper>
  );
};

export default React.memo(WorkingDaysColumn);
