import React from "react";
import { Card } from "components/Card";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import OnboardingItem from "./OnboardingItem";

const OnboardingOptional = () => {
  return (
    <Box w="530px">
      <Card>
        <Column ai="flex-start" gap="20px">
          <Typography typographyType="h2" as="h2" displayType="contents">
            Optional item
          </Typography>
          <Typography typographyType="body" as="span">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </Typography>
          <Column ai="flex-start">
            <OnboardingItem
              title="add first asset"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              state="completed"
            />
            <OnboardingItem
              title="add first location"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              state="todo"
            />
            <OnboardingItem
              title="add first space"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              state="todo"
            />
          </Column>
        </Column>
      </Card>
    </Box>
  );
};

export default OnboardingOptional;
