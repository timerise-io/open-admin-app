import React from "react";
import { Card } from "components/Card";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import OnboardingItem from "./OnboardingItem";

const Onboarding = () => {
  return (
    <Box w="530px">
      <Card>
        <Column ai="flex-start" gap="20px">
          <Typography typographyType="h2" as="h2" displayType="contents">
            Finish project configuration
          </Typography>
          <Typography typographyType="body" as="span">
            To use Timerise in an efficient way you need to finish the base configuration. But no worries, we will guide
            you on how to do it smoothly and fast.
          </Typography>
          <Column ai="flex-start">
            <OnboardingItem
              title="add first service"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              state="todo"
            />
            <OnboardingItem
              title="add service schedule"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              state="blocked"
            />
            <OnboardingItem
              title="configure booking page"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              state="blocked"
            />
          </Column>
        </Column>
      </Card>
    </Box>
  );
};

export default Onboarding;
