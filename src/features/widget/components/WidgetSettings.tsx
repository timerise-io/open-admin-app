import React from "react";
import { Button } from "components/Button";
import { Card } from "components/Card";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { PageContent } from "components/layout/PageContent";
import { PageHeader } from "components/layout/PageHeader";
import { useCopiedToast } from "helpers/hooks/useCopiedToast";
import styled from "styled-components";

const WIDGET_CODE = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Timerise JS SDK</title>
  </head>
  <body>
    <!-- html -->
    <h1>Timerise JS SDK</h1>
    <p>&lt;button&gt; - 
        <button class="timerise-button" 
          data-service-id="<service_id>">
            Open booking page
        </button>
    </p>
    <p>&lt;a&gt; - 
        <a href="https://booking.timerise.io/service/<service_id>" 
          class="timerise-button" 
          data-service-id="<service_id>">
            Open booking page
        </a>
    </p>
    <p>&lt;img&gt; - 
        <img src="https://cdn.timerise.io/landing-page/timerise-logo.png" 
          height="18" 
          class="timerise-button" 
          data-service-id="<service_id>">
    </p>
    <p>Old way: onclick trigger - 
        <a href="javascript:void(0);" onclick="openBookingPage('<service_id>');">
            Open booking page
        </a>
    </p>
    <hr height="1" color="#333333" style="margin-top:48px">
    <p>Timerise.io © 2021</p>
    <!-- end html -->
    <!-- Timerise JS SDK -->
    <script src="https://api.timerise.io/sdk/<project_id>/script.js?v=0.2.3"></script>
    <!-- end Timerise JS SDK -->
  </body>
</html>`;

const StyledCode = styled.code`
  display: block;
  white-space: pre-wrap;
  color: #ffffff;
  background: #333333;
  border-radius: 4px;
  padding: 8px 12px;
  font-family: "Roboto Mono", monospace;
  font-size: 13px;
`;

const CodeWrapper = styled.div`
  position: relative;
`;

const CopyCodeButton = styled(Button)`
  position: absolute;
  width: auto;
  right: 12px;
  top: 12px;
`;

const WidgetSettings = () => {
  const showCopiedToast = useCopiedToast();

  return (
    <div>
      <PageHeader title="Widget" />
      <PageContent>
        <Column w="530px" ai="flex-start">
          <Typography typographyType="body">
            Installing the Timerise widget is simple and only takes a few minutes. Once installed, you’ll be able to
            gather bookings right away.
          </Typography>
          <Box h="32px" />
          <Typography typographyType="h3" as="h3">
            Code
          </Typography>
          <Card>
            <Typography typographyType="body">
              {"Copy and paste the code before the closing </body> tag on your website."}
            </Typography>
            <CodeWrapper>
              <StyledCode>{WIDGET_CODE}</StyledCode>
              <CopyCodeButton
                buttonType="secondary"
                onClick={() => {
                  navigator.clipboard.writeText(WIDGET_CODE);
                  showCopiedToast();
                }}
              >
                Copy code
              </CopyCodeButton>
            </CodeWrapper>
          </Card>
        </Column>
      </PageContent>
    </div>
  );
};

export default WidgetSettings;
