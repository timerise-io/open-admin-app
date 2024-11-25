import React from "react";
import { Card } from "components/Card";
import Radio from "components/Radio";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import styled from "styled-components";

const StyledHeader = styled(Typography)`
  margin-top: 32px;
`;

const BookingPageNotification = () => {
  return (
    <>
      <StyledHeader typographyType="h3" as="h3">
        Notifications
      </StyledHeader>
      <Card>
        <Typography typographyType="body" as="span">
          Choose the way you want to keep your customers notified.
        </Typography>
        <Column ai="flex-start" mt={2.5}>
          <Typography typographyType="label" as="span">
            Notification channel
          </Typography>
          <Row gap="20px" jc="flex-start" mt={1.5}>
            <Radio label="Email" />
            <Radio label="SMS" />
            <Radio label="Email & SMS" />
          </Row>
        </Column>
      </Card>
    </>
  );
};

export default BookingPageNotification;
